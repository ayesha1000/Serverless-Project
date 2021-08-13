const vandium = require("vandium");
const con = require ('./../configs/dbConfig');

exports.handler = vandium.api()
.GET()
.validation({
    queryStringParameters: {
        page: 'number:min=1,max=5',
        limit: 'number:min=1,max=10',
        sortCol: 'string:min=1, max=45'
    }
})
.handler(async(event)=>{
    return new Promise((resolve,reject)=>{
        let page = 1;
        let limit = 10;
        let sortCol = 'customer_id';
        page = (event.queryStringParameters.page!=null) ? event.queryStringParameters.page: page;
        limit = (event.queryStringParameters.limit!=null) ? event.queryStringParameters.limit: limit;
        sortCol = (event.queryStringParameters.sortCol!=null) ? event.queryStringParameters.sortCol: sortCol;
        let name= (event.queryStringParameters.customer_name!=null) ? event.queryStringParameters.customer_name: null;
        const offset = (page-1) * limit;
       
        let query = `SELECT customer_id AS customerID, customer_name AS customerName, 
        customer_phoneno AS customerPhoneno, customer_address AS customerAddress 
        FROM customer WHERE deletflag=0`
        if(name != null) {query += ' AND customer_name = "'+ name+'"'}
        
        con.query(query+' ORDER BY '+ sortCol+ ' LIMIT '+ limit + ' OFFSET '+ offset, (err, result)=>{
            if(err) {reject(err);}
            else {resolve(result)}
        })
    });
})
