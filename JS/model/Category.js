const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({ 
    _id: {type : mongoose.Schema.Types.ObjectId, auto: true},
    name: String,
})

module.exports = mongoose.model('Category', categorySchema);