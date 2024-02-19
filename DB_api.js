const express = require('express');
const { Customers, Products, Orders, OrderDetails, Cart } = require("./DB_connection");
const { Sequelize, Op } = require("sequelize");

const app = express();
const PORT= 3000;

app.use(express.json())

app.get('/liveness', (req, res)=> {
    res.status(200).send('OK');
});

// -------------- Products Routes ---------------
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

app.put('/products/:id', async (req, res) => {
    console.log('Received PUT request with body:', req.body);

    const id = parseInt(req.params.id);
    const newname = req.body.newname;
    const newdescription = req.body.newdescription;
    const newprice = req.body.newprice;
    const newstock = req.body.newstock;

    if (!newname ) {
        res.status(400).json({ error: "A modification is required." });
        return;
    }

    try {
        const [rowsUpdated, [updateProduct]] = await Products.update(
            { name: newname, description: newdescription, price: newprice, stockquantity: newstock },
            {
                returning: true,
                where: { productid: id },
            }
        );

        if (rowsUpdated === 0 || !updateProduct) {
            res.status(404).json({ error: 'Package not found' });
            return;
        }

        res.status(200).json(updateProduct);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/products/:id', async (req, res) => {

    const id = req.params.id;
    try {
        const result = await Products.destroy({
            where: { productid: id }
        });
        if (result === 0) {
            res.status(404).json({ success: false, message: 'No matching rows found for deletion.' });
            return;
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully', result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// -------------- Orders Routes ----------------
app.post('/orders', async (req, res) => {
    const { customerid, orderdate } = req.body;

    try {
        // Créer un nouvel order dans la base de données
        const order = await Orders.create({
            customerid,
            orderdate
        });

        res.status(201).json(order);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/orders/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        const orders = await Orders.findAll({
            where: {
                customerid: userId
            },
            include: [{model: OrderDetails, as: 'orderdetails'}]
        });

        if (orders && orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).send(`No orders found for customerId: ${userId}`);
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ---------------- Cart Routes -----------------

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});