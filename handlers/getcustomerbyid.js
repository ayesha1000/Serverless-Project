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