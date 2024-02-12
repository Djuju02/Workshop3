// MongoDB configuration
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerceDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema and models
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number
});

const Product = mongoose.model('Product', productSchema);


