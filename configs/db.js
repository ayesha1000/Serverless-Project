const {Sequelize, DataTypes} = require('sequelize');
const CustomerModel = require('./../models/Customer');
//require("dotenv").config();

const sequelize = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect : 'mysql',
        dialectModule: require('mysql2'),
        host : process.env.DB_HOST,
        port : process.env.PORT
    }
)
const Customer = CustomerModel(sequelize, DataTypes);
const Models = {Customer}

const connection = {}

module.exports = async() => {
    if(connection.isConnected) {
        console.log('Using existing connection')
        return Models
    }
    //await sequelize.sync() // creates the table if it doesnot exists
    connection.isConnected = true
    console.log('Connection created')
    return Models

}

