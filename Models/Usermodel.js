const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema({
    firstname : {
        type : String,
        required : [true,"Please enter the first name"],
    },
    lastname :{
        type : String,
        required : [true,"Please enter the last name"]
    },
    email : {
        type : String,
        required : [true,"Please enter your email"],
        unique : [true,"Please enter unique email address"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter the email address");
            }
        }
    },
    password : {
        type : String,
        required : [true,"please enter your password"],
    },
    phoneno : {
        type : String,
        required : [true,"Please Enter Your Mobile Number"]
    },
    address : {
        type : String,
        required : true,
    },
    cartData : {
        type : Object,
        default : {}
    },
    role : {
        type : Boolean,
        default : false,
    }
},{timestamps : true});

const usermodel = mongoose.model('usermodel',Schema);

module.exports = usermodel;
