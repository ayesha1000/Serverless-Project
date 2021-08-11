const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const con = require('./../configs/dbConfig');

const app = express();
app.use (bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/customer/', (req,res)=>{

    
    const page = parseInt(req.query.pageNo) || 1
    const limit= parseInt(req.query.pageLimit) || 10
    const offset = (page-1) * limit;
    const name = req.query.customer_name
    const sortcolumn = req.query.sortCol || 'customer_id';
    
    const sortorder= req.query.sortOrder || 'ASC'

    console.log(limit)
    var query = 'SELECT customer_id, customer_name, customer_phoneno, customer_address FROM customer WHERE deletflag=0'
    if(name!=undefined) {
        console.log(name)
        query += ' AND customer_name = '+ name;
    }
    con.query(query+' ORDER BY '+sortcolumn+ ' LIMIT '+limit+' OFFSET '+offset, (err,rows)=>{
        if(err) {
            res.send(err.message);}
       
        res.send(rows);
        console.log('Data Received: ');
        con.end()
    })
})

module.exports.handler = serverless(app)