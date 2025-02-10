const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
