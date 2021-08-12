const con = require ('./../configs/dbConfig');

exports.handler = async(event) => {
    try{
        const {customer_id,customer_name,customer_phoneno, customer_address} = JSON.parse(event.body)
        
        const data = await new Promise((resolve,reject)=>{
            const query = "INSERT INTO customer (customer_id, customer_name, customer_phoneno, customer_address, deletflag) VALUES ('" + customer_id+ "' , '" + customer_name + "' , '" + customer_phoneno + "' , '" + customer_address + "' , '" + 0 + "' );"
           
            con.query(query, function(err, result){
                if(err){
                    reject(err);
                }
                console.log('Customer Created');
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