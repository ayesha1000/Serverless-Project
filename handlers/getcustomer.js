
const con = require('./../configs/dbConfig');
import { snakeCase } from "snake-case";

exports.handler = async (event) => { 
    try {    
        let page = 1;
        let limit = 10;
        let sortCol = 'customer_id';
        var name;
        
        console.log(JSON.parse(event.body))

        if(event.queryStringParameters!=null){
            if(event.queryStringParameters.page !=null){ page = event.queryStringParameters.page}
            if(event.queryStringParameters.limit !=null){ limit = event.queryStringParameters.limit}
            if(event.queryStringParameters.sortCol !=null){ sortCol = snakeCase(event.queryStringParameters.sortCol)}
            if(event.queryStringParameters.customerName !=null){ name = event.queryStringParameters.customerName}
        }
        const offset = (page-1) * limit;

        const data = await new Promise((resolve, reject) => {
            let query = 'SELECT customer_id AS customerID, customer_name AS customerName, customer_phoneno AS customerPhoneno, customer_address AS customerAddress FROM customer WHERE deletflag=0';
            if(name != null) {query += ' AND customer_name = "'+ name+'"'}
            con.query(query +' ORDER BY '+sortCol +' LIMIT '+limit+' OFFSET '+offset, function (err, result) {  
                if (err) {      
                    reject(err);
                }         
                resolve(result);  
            });     
        }); 
        return { 
            statusCode: 200,  
            body: JSON.stringify(data)   
        } 
    } 
    catch (err) {    
        return {   
            statusCode: 400,   
            body: err.message 
            } 
        }
    }; 