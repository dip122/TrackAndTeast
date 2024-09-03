const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    description : {
        type : String,
        required : true,
    }
},{timestamps : true});

const contactmodel = mongoose.model('contact',Schema);
module.exports = contactmodel;