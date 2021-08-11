const {Sequelize, DataTypes} = require('sequelize');
require("dotenv").config();
const CustomerModel = require('./../models/Customer');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect :'mysql',
        dialectModule: require('mysql2'),
        host: process.env.DB_HOST,
        port: process.env.DB_PORT

    }

)

const Customer = CustomerModel(sequelize, DataTypes)

const Models = {Customer}
const connection = {}

module.exports = async() =>{
    if(connection.isConnected) {
        console.log('Using existing connection');
        return Models
    }
    await sequelize.sync()
    await sequelize.authenticate()
    connection.isConnected= true
    console.log('Created connection')
    return Models

}