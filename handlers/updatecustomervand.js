const vandium = require("vandium");
const con = require ('./../configs/dbConfig');

exports.handler = vandium.api()
.PUT()
.validation ({
    pathParameters: {
        id: 'number:min=1,max=20,required'
    },
    body: {
        customer_name: 'string:min=1,max=45',
        customer_address: 'string:min=1,max=45',
        customer_phoneno: 'string:min=1,max=45'
    }
})
.handler(async(event)=>{
    return await new Promise((resolve,reject)=>{

        let query = `SELECT customer_id, customer_name,customer_phoneno, customer_address FROM customer 
        WHERE deletflag=0 AND customer_id=${event.pathParameters.id}`;

        con.query(query, (err,res)=>{
            if(err) {reject(err);}
            const {customer_id,customer_name,customer_phoneno, customer_address} = {...res[0],...event.body}
        
        const newquery = `UPDATE customer SET customer_name= '${customer_name}', customer_phoneno = '${customer_phoneno}', customer_address = '${customer_address}' WHERE customer_id='${customer_id}'`;
        con.query(newquery, (err,result)=>{
            if(err) { reject(err);}
            resolve('Customer Updated successfully')
        })
    })

    });
})
