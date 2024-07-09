const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'usermodel',
        required : true,
    },
    menuid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'menu',
        required : true,
    },
    ratings : {
        type : Number,
    },
    reviews : {
        type : String,
    }
},{timestamps : true});

const ratingsmodel = mongoose.model('userratings',Schema);

module.exports = ratingsmodel;