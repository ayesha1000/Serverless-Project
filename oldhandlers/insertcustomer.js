const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const con = require('./../configs/dbConfig')

const app = express();
app.use (bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

app.post('/customer/', (req,res)=>{
    const {customer_id,customer_name,customer_phoneno,customer_address} = req.body
    const table='customer'
    //const query = `INSERT INTO customer (customer_id, customer_name ,customer_phoneno, customer_address) VALUES (${customer_id} , '${customer_name}', '${customer_phoneno}' , '${customer_address}')`
    const query = "INSERT INTO " + table + " (customer_id, customer_name, customer_phoneno, customer_address, deletflag) VALUES ('" + customer_id+ "' , '" + customer_name + "' , '" + customer_phoneno + "' , '" + customer_address + "' , '" + 0 + "' );"
    con.query(query, (err,rows)=>{
        if(err) {
            res.send(err.message);}
    
        res.send(rows);
        console.log('Data inserted: ');
    })
})

module.exports.handler = serverless(app)