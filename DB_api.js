const express = require('express');
const { Customers, Products, Orders, OrderDetails } = require("./DB_connection");
const { Sequelize, Op } = require("sequelize");

const app = express();
const PORT= 3000;

app.use(express.json())

app.get('/liveness', (req, res)=> {
    res.status(200).send('OK');
});

app.get('/products', async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const product = await Products.findByPk(id);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});

app.post('/products', async (req, res) => {
    const { name, description, price, stockquantity } = req.body;

    try {
        // Créer un nouveau package dans la base de données
        const prod = await Products.create({
            name,
            description,
            price,
            stockquantity
        });

        res.status(201).json(prod);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});