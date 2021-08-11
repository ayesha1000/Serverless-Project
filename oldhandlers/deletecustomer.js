const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const con = require('./../configs/dbConfig')

const app = express();
app.use (bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.delete('/customer/:id', (req,res)=>{
    const id = req.params.id


        const query = `UPDATE customer SET deletflag= 1 WHERE customer_id='${id}'`
        con.query(query, (err,result)=>{
            console.log('Data deleted');
            if(err){
                res.send(err.message)
            }
            res.send(result)
        })   
        console.log('Task completed');
    })

 
module.exports.handler = serverless(app)