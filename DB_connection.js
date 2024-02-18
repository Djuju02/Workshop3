import { Sequelize, Model, DataTypes } from 'sequelize';

// Configuration de Sequelize
const sequelize = new Sequelize('decentralization_workshop3', 'decentralization_user', 'Password01', {
    host: 'localhost',
    dialect: 'postgres'
});

//Class Products
class Products extends Model {}
Products.init(
    {
        ProductID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING(100),
        },
        Description: {
            type: DataTypes.STRING(500),
        },
        Price: {
            type: DataTypes.DECIMAL,
        },
        StockQuantity: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        timestamps: false,
    }
);

//Class Customers
class Customers extends Model {}
Customers.init(
    {
        CustomerID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        FirstName: {
            type: DataTypes.STRING(50),
        },
        LastName: {
            type: DataTypes.STRING(50),
        },
        Email: {
            type: DataTypes.STRING(100),
        },
        Address: {
            type: DataTypes.STRING(255),
        },
        City: {
            type: DataTypes.STRING(100),
        },
        PostalCode: {
            type: DataTypes.STRING(20),
        },
        Country: {
            type: DataTypes.STRING(100),
        },
    },
    {
        sequelize,
        modelName: 'Customer',
        tableName: 'Customers',
        timestamps: false,
    }
);

//Class Orders
class Orders extends Model {}
Orders.init(
    {
        OrderID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        CustomerID: {
            type: DataTypes.INTEGER,
        },
        OrderDate: {
            type: DataTypes.DATE,
        },
        LastName: {
            type: DataTypes.STRING(50),
        },
       TotalAmount: {
            type: DataTypes.DECIMAL,
        },
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'Orders',
        timestamps: false,
    }
);

//Class OrderDetails
class OrderDetails extends Model {}
OrderDetails.init(
    {
        OrderDetailID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        OrderID: {
            type: DataTypes.INTEGER,
        },
        ProductID: {
            type: DataTypes.INTEGER,
        },
        Quantity: {
            type: DataTypes.INTEGER,
        },
        Price: {
            type: DataTypes.DECIMAL,
        },
    },
    {
        sequelize,
        modelName: 'OrderDetail',
        tableName: 'OrderDetails',
        timestamps: false,
    }
);

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));