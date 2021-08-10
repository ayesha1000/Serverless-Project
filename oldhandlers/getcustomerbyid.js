const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const con = require('./../configs/dbConfig')

const app = express();
app.use (bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/customer/:id', (req,res)=>{
    const id = req.params.id
    con.query(`SELECT customer_id, customer_name, customer_phoneno, customer_address FROM customer WHERE deletflag=0 AND customer_id=${id}`, (err,rows)=>{
        if(err) {
            res.send(err.message);}
    
        res.send(rows);
        console.log(rows[0])
        console.log('Data Received: ');
    })
})

module.exports.handler = serverless(app)