const contactmodel = require('../Models/ContactModel');
const usermodel = require('../Models/Usermodel');

const contactUsController = async(req,res)=>{
    try{
        const {name,email,description} = req.body;
        // console.log(req.body);
        if(!name || !email || !description){
            return res.status(200).send({success : false , message : "Fill the fields"});
        }
        const newcontact = await new contactmodel({ name,email,description}).save();
        return res.status(200).send({success : true , message : "contacted successfully", newcontact});
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of contactUsController", error
        })
    }
};

const GetcontactsController = async(req,res)=>{
    try{
        const id = req.user._id;
        const contacts = await contactmodel.find({});
        return res.status(200).send({success : true,contacts});
    }catch(error){
        console.log(error);
        return res.status(500).send({success : false , message : "server side error" , error});
    }
}

const DeleteContactsController = async(req,res)=>{
    try{
        const id = req.params.id;
        const personid = req.user.id;
        const user = await usermodel.findById(id);
        // if(user.role === 1){//Only Admin can delete
        //     return res.status(200).send({success : false , message : "You are not admin"});
        // }
        const deletedcontact = await contactmodel.findByIdAndDelete(id);
        return res.status(200).send({success : true, deletedcontact})
    }catch(error){
        console.log(error);
        return res.status(500).send({success : false, message : "server side error", error})
    }
}

module.exports = {contactUsController,GetcontactsController,DeleteContactsController}