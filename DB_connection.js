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
        },
        orderdate: {
            type: DataTypes.DATE,
        },
        totalamount: {
            type: DataTypes.DECIMAL,
        },
    },
    {
        sequelize,
        modelName: 'order',
        tableName: 'orders',
        timestamps: false,
    }
);

//Class OrderDetails
class OrderDetails extends Model {}
OrderDetails.init(
    {
        orderdetailid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        orderid: {
            type: DataTypes.INTEGER,
        },
        productid: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        sequelize,
        modelName: 'orderdetail',
        tableName: 'orderdetails',
        timestamps: false,
    }
);

Customers.hasMany(Orders, { foreignKey: 'customerid' });
Orders.belongsTo(Customers, { foreignKey: 'customerid' });

Orders.hasMany(OrderDetails, { foreignKey: 'orderid' });
OrderDetails.belongsTo(Orders, { foreignKey: 'orderid' });

Products.hasMany(OrderDetails, { foreignKey: 'productid' });
OrderDetails.belongsTo(Products, { foreignKey: 'productid' });

//Synchroniser les modèles avec la base de données
async function syncModels() {
    try {
        await sequelize.authenticate();
        console.log('Connecté à la base de données');

        // Synchronise chaque modèle avec la base de données
        await Customers.sync();
        await Products.sync();
        await Orders.sync();
        await OrderDetails.sync();

        console.log('Synchronisation réussie');
    } catch (error) {
        console.error('Erreur lors de la synchronisation avec la base de données:', error);
    }
}
syncModels();

module.exports = { Customers, Products, Orders, OrderDetails };