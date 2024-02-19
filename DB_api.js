const express = require('express');
const { Customers, Products, Orders, Cart } = require("./DB_connection");
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
    const { customerid, products } = req.body;

    let total = 0;

    try {
        //Check productid
        for (const item of products){
            const product = await Products.findByPk(item.productid);
            if (!product) {
                return res.status(404).send(`Product not found with ID: ${item.productid}`);
            }
            //Compute the total price
            total += product.price * item.quantity;
        }

        // Créer un nouvel order dans la base de données
        const order = await Orders.create({
            customerid: customerid,
            products: products,
            total_price: total
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
app.post('/cart/:userId', async (req, res) => {
    const new_product = req.body.newproduct;
    const customerid = parseInt(req.params.userId);

    try {
        // Récupérer le panier existant
        let cart = await Cart.findOne({
            where: {
                customerid: customerid
            },
        });

        //Check productid
        const product = await Products.findByPk(new_product.productid);
        if (!product) {
            return res.status(404).send(`Product not found with ID: ${new_product.productid}`);
        }

        let totalc = 0;
        let updatedProducts = [];

        if (cart) {
            // Si le panier existe, on récupère les produits sélectionnés
            updatedProducts = cart.sel_product;
            console.log(updatedProducts);

            // Vérifier si le produit existe déjà dans le panier
            const productIndex = updatedProducts.findIndex(p => p.productid === new_product.productid);

            if (productIndex > -1) {
                // Si le produit est déjà dans le cart, mettre à jour la quantité
                updatedProducts[productIndex].quantity += new_product.quantity;
            } else {
                // Sinon, ajouter le nouveau produit
                updatedProducts.push({ productid: new_product.productid, quantity: new_product.quantity });
            }

            console.log(updatedProducts);
            // Recalculer le total
            for (const sel_product of updatedProducts) {
                const product = await Products.findByPk(sel_product.productid);
                totalc += product.price * sel_product.quantity;
            }

            // Mettre à jour le panier existant
            const newSelProduct = JSON.parse(JSON.stringify(updatedProducts)); // Crée une nouvelle instance de l'objet
            cart = await Cart.update({
                sel_product: newSelProduct,
                total: totalc
                },
                {
                    returning: true,
                    where: { customerid: customerid },
                }
            );
        } else {
            // Si aucun panier n'existe, créer un nouveau panier
            totalc = product.price * new_product.quantity;
            updatedProducts.push({ productid: new_product.productid, quantity: new_product.quantity });

            cart = await Cart.create({
                customerid: customerid,
                sel_product: updatedProducts,
                total: totalc
            });
        }

        res.status(201).json(cart);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/cart/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        const cart = await Cart.findAll({
            where: {
                customerid: userId
            },
        });

        if (cart && cart.length > 0) {
            res.status(200).json(cart);
        } else {
            res.status(404).send(`No orders found for customerId: ${userId}`);
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/cart/:userId/item/:productId', async (req, res) => {
    const customerid = parseInt(req.params.userId);
    const productid = parseInt(req.params.productId);

    try {
        // Récupérer le panier existant
        let cart = await Cart.findOne({
            where: {
                customerid: customerid
            },
        });

        if (!cart) {
            return res.status(404).send(`Cart not found for customer ID: ${customerid}`);
        }

        let updatedProducts = cart.sel_product;
        const productIndex = updatedProducts.findIndex(p => p.productid === productid);
        console.log(productIndex);

        if (productIndex > -1) {
            // Si le produit est bien dans le cart, le supprimer
            updatedProducts.splice(productIndex, 1);
        } else {
            return res.status(404).send(`Product not found in cart: ${productid}`);
        }

        // Si le panier est vide après la suppression, supprimez le panier
        if (updatedProducts.length === 0) {
            await Cart.destroy({
                where: {
                    customerid: customerid
                },
            });

            return res.status(200).send(`Cart for customer ID: ${customerid} has been deleted.`);
        } else {
            // Recalculer le total
            let totalc = 0;
            for (const sel_product of updatedProducts) {
                const product = await Products.findByPk(sel_product.productid);
                if (product) {
                    totalc += product.price * sel_product.quantity;
                }
            }

            // Mettre à jour le panier
            const newSelProduct = JSON.parse(JSON.stringify(updatedProducts)); // Crée une nouvelle instance de l'objet
            cart = await Cart.update({
                    sel_product: newSelProduct,
                    total: totalc
                },
                {
                    returning: true,
                    where: { customerid: customerid },
                }
            );
        }
        res.status(201).json(cart);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});