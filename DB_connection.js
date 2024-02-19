const { Sequelize, Model, DataTypes} = require("sequelize");

// Configuration de Sequelize
const sequelize = new Sequelize('decentralization_workshop3', 'decentralization_user', 'Password01', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log
});

//Class Products
class Products extends Model {}
Products.init(
    {
        productid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
        },
        description: {
            type: DataTypes.STRING(500),
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
        },
        stockquantity: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'product',
        tableName: 'products',
        timestamps: false,
    }
);

//Class Customers
class Customers extends Model {}
Customers.init(
    {
        customerid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING(50),
        },
        lastname: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(100),
        },
        address: {
            type: DataTypes.STRING(255),
        },
        city: {
            type: DataTypes.STRING(100),
        },
        postalcode: {
            type: DataTypes.STRING(20),
        },
        country: {
            type: DataTypes.STRING(100),
        },
    },
    {
        sequelize,
        modelName: 'customer',
        tableName: 'customers',
        timestamps: false,
    }
);

//Class Orders
class Orders extends Model {}
Orders.init(
    {
        orderid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        customerid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customers',
                key: 'customerid',
            }
        },
        products: {
            type: DataTypes.JSONB,
        },
        total_price: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING(50),
            defaultValue: "Waiting for delivery",
        },
        orderdate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'order',
        tableName: 'orders',
        timestamps: false,
    }
);

//Class Cart
class Cart extends Model {}
Cart.init(
    {
        cartid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        customerid: {
            type: DataTypes.INTEGER,
        },
        sel_product: {
            type: DataTypes.JSONB,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        sequelize,
        modelName: 'cart',
        tableName: 'cart',
        timestamps: false,
    }
);

Customers.hasMany(Orders, { foreignKey: 'customerid' });
Orders.belongsTo(Customers, { foreignKey: 'customerid' });

// Un Customer peut avoir plusieurs Carts
Customers.hasMany(Cart, { foreignKey: 'customerid' });
Cart.belongsTo(Customers, { foreignKey: 'customerid' });

//Synchroniser les modèles avec la base de données
async function syncModels() {
    try {
        await sequelize.authenticate();
        console.log('Connecté à la base de données');

        // Synchronise chaque modèle avec la base de données
        await Customers.sync();
        await Products.sync();
        await Orders.sync();
        await Cart.sync();

        console.log('Synchronisation réussie');
    } catch (error) {
        console.error('Erreur lors de la synchronisation avec la base de données:', error);
    }
}
syncModels();

module.exports = { Customers, Products, Orders, Cart };