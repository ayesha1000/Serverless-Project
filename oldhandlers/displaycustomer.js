const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
//import Pool from 'pg'
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Eiman.1017',
    port: 5432,
  })
  

const app = express();
app.use (bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/customerpg', (req,res)=>{
    const query = 'SELECT * from testschema.customer';
    pool.query(query, (err, result) => {
        if(err) {response = {data:null, message: err.message}
        res.send(response)}

        res.send(result.rows);
        pool.end();
      //console.log(res.rows);
   
    });
})

module.exports.handler = serverless(app)