const vandium = require("vandium");
const con = require ('./../configs/dbConfig');

exports.handler = vandium.api()
.POST()
.validation ({
    body: {
        customer_name: 'string:min=1,max=45,required'
    }
})
.handler(async(event)=>{
    return await new Promise((resolve,reject)=>{
        const {customer_id,customer_name,customer_phoneno, customer_address} = event.body
        con.query("INSERT INTO customer (customer_id, customer_name, customer_phoneno, customer_address, deletflag) VALUES ('" + customer_id+ "' , '" + customer_name + "' , '" + customer_phoneno + "' , '" + customer_address + "' , '" + 0 + "' );"
        ,(err, result)=>{
            if(err) {reject(err);}
            else {resolve(result)}
        })
    });
})
