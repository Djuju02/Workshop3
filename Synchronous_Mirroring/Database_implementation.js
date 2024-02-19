// Connexion to the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerceDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of the first schema
const productSchemaA = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});
const ProductA = mongoose.model('ProductA', productSchemaA);

// Definition of the second schema
const productSchemaB = new mongoose.Schema({
    productName: String,
    unitPrice: Number,
    productCategory: String,
    inStock: Boolean
});
const ProductB = mongoose.model('ProductB', productSchemaB);

async function insertProductWithSyncMirroring(productData) {
    const productA = new ProductA({
        name: productData.name,
        price: productData.price,
        category: productData.category
    });
    await productA.save();

    const productB = new ProductB({
        productName: productData.name,
        unitPrice: productData.price,
        productCategory: productData.category,
        inStock: productData.stock > 0
    });
    await productB.save();

    console.log('Produit insert and replicate with success in the both structures.');
}
