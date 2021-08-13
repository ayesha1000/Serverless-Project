const vandium = require("vandium");
const Joi = require('joi');
const con = require ('./../configs/dbConfig');

exports.handler = vandium.api()
.DELETE()
.validation ({
    pathParameters: {
        id: 'number:min=1,max=20,required'
    }
})
.handler(async(event)=>{
    return new Promise((resolve,reject)=>{
        
        con.query(`UPDATE customer SET deletflag= 1 WHERE customer_id='${event.pathParameters.id}'`, (err, result)=>{
            if(err) {reject(err);}
            else { resolve("Customer deleted successfully")}           
        })
    });
})
