const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name : {
        type : String,
    },
});

const categorymodel = mongoose.model('category',categorySchema);
module.exports = categorymodel;