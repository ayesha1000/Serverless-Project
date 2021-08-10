const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const con = require('./../configs/dbConfig')

const app = express();
app.use (bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.put('/customer/:id', (req,res)=>{
    const id = req.params.id

    con.query(`SELECT * FROM customer WHERE customer_id=${id}`, (err,rows)=>{
        if(err) {
            res.send(err.message);}
        const {customer_id,customer_name,customer_phoneno, customer_address} = {...rows[0], ...req.body}
        console.log(customer_id)
        console.log(customer_phoneno)
        console.log(customer_name)
        console.log(customer_address)
        const query = `UPDATE customer SET customer_name= '${customer_name}', customer_phoneno = '${customer_phoneno}', customer_address = '${customer_address}' WHERE customer_id='${customer_id}'`
        con.query(query, (err,result)=>{
            console.log('Data Updated');
            if(err){
                res.send(err.message)
            }
            res.send(result)
        })   
        console.log('Task completed');
    })

    
})

module.exports.handler = serverless(app)