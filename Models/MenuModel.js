const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    name : {
        type : String,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    image : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true,
        }
    },
    price : {
        type : Number,
        requried : true,
    },
    size : {
        type : String,
    },
    ratings : {
        type : Number,
        default : 0,
    },
    count : {
        type : Number,
        default : 0
    },
    averagerating : {
        type : Number,
        default : 0,
    }
},{timestamps : true});

const menuModel = mongoose.model('menu',menuSchema);
module.exports = menuModel;