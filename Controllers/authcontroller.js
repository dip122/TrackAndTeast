const usermodel = require('../Models/Usermodel');
const {hashpassword,comparepassword} = require('../Helper/authHelper');
const GenerateToken = require('../Config/Token');
const {transporter} = require('../Config/EmailConfig');
const jwt = require('jsonwebtoken')

const registercontroller = async(req,res)=>{
    try{
        const {firstname,lastname , email,password,phoneno,address} = req.body;
        if(!firstname || !lastname){
            return res.status(400).send({
                success : false,
                message : "Enter Your Full name"
            })
        }
        if(!email){
            return res.status(400).send({
                success : false,
                message : "Enter your email"
            })
        }
        if(!password){
            return res.status(400).send({
                success : false,
                message : "Enter your password"
            })
        }
        if(!phoneno || !address){
            return res.status(400).send({
                success : false,
                message : "Complete Your contact details"
            })
        }

        const user = await usermodel.findOne({email : email});
        if(user){
            return res.status(400).send({
                success : false,
                message : "Already have an account"
            })
        }

        const hashedpassword = await hashpassword(password);
        const newuser = new usermodel({
            firstname,
            lastname,
            email,
            password : hashedpassword,
            phoneno,
            address
        });

        const saveduser = await usermodel.insertMany([newuser]);
        return res.status(201).send({
            success : true,
            message : "registered successfully",
            user : {
                name : firstname + lastname,
                email : email,
                phoneno : phoneno,
                address : address
            }
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of registercontroller",
            error,
        })
    }
}

const logincontroller = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email){
            return res.status(200).send({
                success : false,
                message : "Please enter email"
            })
        }
        if(!password){
            return res.status(200).send({
                success : false,
                message : "Please enter Password"
            })
        }

        const user = await usermodel.findOne({email: email});
        if(!user){
            return res.status(200).send({
                success : false,
                message : "Don't have an account"
            })
        }
        const hashedpassword = user.password;
        const isMatch = comparepassword(password,hashedpassword);
        if(!isMatch){
            return res.status(200).send({
                success : false,
                message : "Password is not matching"
            })
        }
        const token = await GenerateToken(user._id);
        return res.status(200).send({
            success : true,
            messgae : "Login successful",
            user : {
                _id : user._id,
                name : user.name,
                email : user.email,
                contact : user.phoneno,
                address : user.address,
                role : user.role,
                cartData : user.cartData
            },
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of logincontroller",
            error,
        })
    }
}

const getallusercontroller = async(req,res)=>{
    try{
        const users = await usermodel.find({});
        return res.status(200).send({
            success : true,
            message : "Getallusercontroller",
            users
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({success : false , message : "Server side error in getallusercontroller",error})
    }
}

const changepasswordcontroller = async(req,res)=>{
    try{
        const {password} = req.body;
        if(!password){
            return res.status(400).send({message : "Provide password"});
        }
        const userid = req.user.id;
        const hashedpassword = await hashpassword(password);
        const user = await usermodel.findByIdAndUpdate(userid,{
            password : hashedpassword
        }, {new : true});
        return res.status(200).send({
            success : true,
            message : "password changed",
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : true,
            message : "server side error in case of changepasswordcontroller",
            error
        })
    }
}

const changeaddresscontroller = async(req,res)=>{
    try{
        const {address , contact} = req.body;
        const id = req.user.id;//userid
        const  updateduser  = await usermodel.findByIdAndUpdate(id,{
            phoneno : contact,
            address : address,
        }, {new : true});

        return res.status(200).send({
            success : true,
            message : "Successfully password changed",
            user : updateduser
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of changeaddresscontroller",
            error
        })
    }
}

const forgetpasswordcontroller = async(req,res)=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.status(200).send({
                success : false,
                message : "Provide Email First"
            })
        }
        const user = await usermodel.findOne({email : email});
        if(!user){
            return res.status(200).send({
                success : false,
                message : "Email does not exist"
            })
        }
        // console.log(email);
        const token = jwt.sign({id : user._id},process.env.SECRET_KEY, {expiresIn : "10m"});
        const link = `https://trackandteast.onrender.com/resetpassword/${token}`;
        const info = await transporter.sendMail({
            from : process.env.EMAIL,
            to : email,
            Subject : "ForgetPassowrd Email",
            text : "Link is valid for 10 min",
            html : `<a href = "${link}">${link}</a>`
        });

        return res.status(200).send({
            success : true,
            message : "Email Sent Successfully"
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of forgetpasswordcontroller",
            error
        })
    }
}

const resetpasswordcontroller = async(req,res)=>{
    try{
        const {password} = req.body;
        const {token} = req.params;
        if(!password || !token){
            return res.status(200).send({
                success : true,
                message : "token and password not received"
            })
        }

        const decode = jwt.verify(token,process.env.SECRET_KEY);
        const user = await usermodel.findById(decode.id);

        const hashedpassword = await hashpassword(password)
        const updateduser = await usermodel.findByIdAndUpdate(user._id,{
            password : hashedpassword
        }, { new : true });

        return res.status(200).send({
            success : true,
            message : "Successfully password is reset",
            user : updateduser
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of resetpassword controller",
            error
        })
    }
}
module.exports = {registercontroller,logincontroller,getallusercontroller,
    changepasswordcontroller,changeaddresscontroller,forgetpasswordcontroller,resetpasswordcontroller};