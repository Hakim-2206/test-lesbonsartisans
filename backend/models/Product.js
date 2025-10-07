const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    warranty_years: { type: Number, min: 0 },
    available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema)