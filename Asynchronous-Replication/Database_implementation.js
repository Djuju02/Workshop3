const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerceDB', { useNewUrlParser: true, useUnifiedTopology: true });

const mirrorMongoose = require('mongoose');
const mirrorDb = mirrorMongoose.createConnection('mongodb://localhost/ecommerceDBMirror', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number
});
const Product = mongoose.model('Product', productSchema);

const mirrorProductSchema = new mirrorMongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number
});
const MirrorProduct = mirrorDb.model('MirrorProduct', mirrorProductSchema);

async function insertProductWithAsyncReplication(productData) {
    const productA = new ProductA({
        name: productData.name,
        price: productData.price,
        category: productData.category
    });
    await productA.save();
    
    setTimeout(async () => {
        const productB = new ProductB({
            productName: productData.name,
            unitPrice: productData.price,
            productCategory: productData.category,
            inStock: productData.stock > 0
        });
        await productB.save();
        console.log('Product replicate with success in the second structure after 5s');
    }, 5000);
}
