const con = require ('./../configs/dbConfig');

exports.handler = async(event) => {
    try{
       
        const data = await new Promise((resolve,reject)=>{
            let id = event.pathParameters.id;
            let query = `UPDATE customer SET deletflag= 1 WHERE customer_id='${id}'`;
            con.query(query, function(err, result){
                if(err){
                    reject(err);
                }
                resolve(result)
            });
        });
        return {
            statusCode : 200,
            body : JSON.stringify('Customer deleted successfully')
        }
    }
    catch(err){
        return {
            statusCode : 400 , 
            body : err.message
        }
    }
}