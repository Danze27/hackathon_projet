const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({ 
    _id: {type : mongoose.Schema.Types.ObjectId, auto: true},
    name: String,
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);