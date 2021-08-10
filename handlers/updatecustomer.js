const con = require ('./../configs/dbConfig');

exports.handler = async(event) => {
    try{

        console.log(event)
        const data = await new Promise((resolve,reject)=>{
            let id = event.pathParameters.id;
            let query = `SELECT customer_id AS customerID, customer_name AS customerName, customer_phoneno AS customerPhoneno, customer_address AS customerAddress FROM customer WHERE deletflag=0 AND customer_id=${id}`;
            con.query(query, function(err, result){
                if(err){
                    reject(err);
                }
                const {customerID,customerName,customerPhoneno, customerAddress} = {...result[0],...JSON.parse(event.body)}
                console.log(customerID)
                console.log(customerPhoneno)
                console.log(customerAddress)
                console.log(customerName)
                const newquery = `UPDATE customer SET customer_name= '${customerName}', customer_phoneno = '${customerPhoneno}', customer_address = '${customerAddress}' WHERE customer_id='${customerID}'`
                con.query(newquery, (err,res)=>{
                    console.log('Data Updated');
                    if(err){
                        reject(err);
                    }
                    resolve(res)
                })
                resolve(result)
            });
        });
       
        return {
            statusCode : 200,
            body : JSON.stringify(data)
        }
    }
    catch(err){
        return {
            statusCode : 400 , 
            body : err.message
        }
    }
}