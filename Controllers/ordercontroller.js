const ordermodel = require('../Models/order');
const usermodel = require('../Models/Usermodel');
const { instance } = require("../Config/Razorpay")
const crypto = require('crypto');

const placeordercontroller = async(req,res)=>{
    try{
        const id = req.user.id;
        const {items,amounts,contact,address} = req.body;
        if(!items || !amounts || !contact || !address){
            return res.status(200).send({
                success : false,
                message : "Please enter all the fields",
            })
        };
        const options = {
            amount: parseInt(amounts, 10), // Convert amounts to an integer
            currency: "INR",
            receipt: Date.now().toString(),
        };

        const paymentResponse = await instance.orders.create(options);
        // console.log(paymentResponse)

        if(!paymentResponse){
            return res.status(200).send({
                success : false,
                message : "Payment Response was not generated"
            })
        }

        const ordersave = new ordermodel({
            userid : id,
            items : JSON.parse(items),
            amount : amounts,
            contact : contact,
            address : address,
            status : "order-placed"
        });

        const placedorder = await ordermodel.insertMany([ordersave]);

        const updateduser = await usermodel.findByIdAndUpdate(id,{cartData : {}}, { new : true});
        return res.status(200).send({
            success : true,
            message : "Order created successfully",
            placedorder,
            payment : paymentResponse
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of placeordercontroller",
            error
        })
    }
}

const listorderscontroller = async(req,res)=>{//admin orders 
    try{
        const orders = await ordermodel.find({}).populate("userid")
        return res.status(200).send({
            success : true,
            message : "Successfully we have got all the orders",
            orders
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of placeordercontroller",
            error,
        })
    }
}

const orderbyuseridcontroller = async(req,res)=>{//user orders
    try{
        const id = req.user.id;
        // console.log(id);
        const orders = await ordermodel.find({userid : id}).populate("userid");
        return res.status(200).send({
            success : true,
            message : "Successfully we have got all the orders of user",
            orders
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of orderbyuseridcontroller",
            error,
        })
    }
}

const statusupdatecontroller = async(req,res)=>{//status order
    try{
        const id = req.params.id;
        const userid = req.user.id;
        const user = await usermodel.findById(userid);
        if(user.role === false){
            return res.status(200).send({
                success : false,
                message : "You are not admin",
            })
        }
        const newupdatedstatus = await ordermodel.findByIdAndUpdate(id,{
            status : req.body.status
        },{
            new : true,
            runValidators : true
        });
        if(newupdatedstatus){
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('OrderUpdated',{ id : id , status : req.body.status})
        }
        return res.status(200).send({
            success : true,
            message : "Successfully status updated",
            status : req.body.status
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of statusupdatecontroller",
            error,
        })
    }
}
const orderbyidcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const order = await ordermodel.findById(id);
        // console.log(order);
        return res.status(200).send({
            success : true,
            message : "Successfully got the order",
            order,
        })
    }catch(error){
        console.log(error);
        return res.status(200).send({
            success : true,
            message : "Server side error in case of ordervyidcontroller",
            error,
        })
    }
}
const verifyordercontroller = async(req,res)=>{
    try{
        // const id = req.user.id;//user ID
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
        if(!razorpay_payment_id || !razorpay_order_id || !razorpay_signature){
            return res.status(400).send({
                success : false,
                message : "Razorpay details is not received",
            })
        }

        // console.log(razorpay_payment_id, razorpay_order_id,razorpay_signature);

        const body_data = razorpay_order_id+"|"+razorpay_payment_id;
        const expect = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET).update(body_data).digest('hex');
        const isValid = expect === razorpay_signature;
        if(isValid){
            res.redirect(`https://trackandteast.onrender.com/success`);
        }else{
            res.redirect(`https://trackandteast.onrender.com/failed`)
        }
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of verify_order controller",
            error,
        })
    }
}

module.exports = {placeordercontroller,listorderscontroller,orderbyuseridcontroller,
    statusupdatecontroller,orderbyidcontroller,verifyordercontroller}