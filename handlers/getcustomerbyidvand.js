const vandium = require("vandium");
const con = require ('./../configs/dbConfig');

exports.handler = vandium.api()
.GET(
    (event)=>{
    return new Promise((resolve,reject)=>{
        
        con.query(`SELECT customer_id AS customerID, customer_name AS customerName, 
        customer_phoneno AS customerPhoneno, customer_address AS customerAddress 
        FROM customer WHERE deletflag=0 AND customer_id=${event.pathParameters.id} `, (err, result)=>{
            if(err) {reject(err);}
            else {resolve(result)}
        })
    });
})
