const mysql = require('mysql');
require("dotenv").config();

const con = mysql.createConnection ({
    host : process.env.DB_HOST ,
    user : process.env.DB_USER ,
    password : process.env.DB_PASS,
    database: process.env.DB_NAME
})
con.connect ((err)=> {
    if(err) {
        console.log('Error connecting to db') ;
        console.log(err)
        return;
    }
    console.log('Connection established');
})

module.exports = con