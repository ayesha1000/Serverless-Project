const connectToDatabase = require('./../configs/db');

function HTTPError (statusCode, message) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
  }

module.exports.handler = async(event) => {
  try{
    let page = 1;
    var lim = 10;
    let sortCol = 'customer_id';

    if(event.queryStringParameters!=null){
      if(event.queryStringParameters.page !=null){ page = event.queryStringParameters.page}
      if(event.queryStringParameters.limit !=null){ lim = event.queryStringParameters.limit}
      if(event.queryStringParameters.sortCol !=null){ sortCol = (event.queryStringParameters.sortCol)}
  }
    const offset = (page-1) * lim;
    const limit= parseInt(lim);
    console.log(page)
    console.log(lim)
    console.log(sortCol)

    const {Customer} = await connectToDatabase();
    const customer = await Customer.findAll({ attributes: ['customer_id', 'customer_name','customer_phoneno','customer_address'], 
    order: [[sortCol, 'ASC']], 
    offset: offset,
    limit: limit,
    where: {
        deletflag: 0},
    })
    if(!customer) {
      throw new HTTPError(404,'Could not get Customers')
    }
    return {
      statusCode: 200,
      body : JSON.stringify(customer)
    }

  }
  catch(err) {
    return {
      statusCode : err.StatusCode || 500,
      body : err.message || 'Could not fetch the customers'
    }
   }
  
}
