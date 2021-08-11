const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const con = require('./../configs/dbConfig')

const app = express();
app.use (bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/customer/', (req,res)=>{
    con.query('SELECT customer_id, customer_name, customer_phoneno, customer_address FROM customer', (err,rows)=>{
        if(err) {
            res.send(err.message);
        }
       
        res.send(rows);
        con.end()
    })
})

module.exports.handler = serverless(app)