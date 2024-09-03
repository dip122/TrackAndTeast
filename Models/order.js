const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'usermodel',
        required : true,
    },
    items : {
        type : Array,
    },
    amount : {
        type : Number,
        required : true,
    },
    contact : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    payment : {
        type : String,
        default : "",
    },
    Date : {
        type : Date,
        default : Date.now(),
    },
    status : {
        type : String,
        default : "order-placed",
    }
},{timestamps : true});

const ordermodel = mongoose.model('order',orderSchema);
module.exports = ordermodel;