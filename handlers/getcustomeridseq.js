const connectToDatabase = require('./../configs/db');

function HTTPError (statusCode, message) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
  }

module.exports.handler = async(event) => {
  try{

    const {Customer} = await connectToDatabase();
    const customer = await Customer.findAll({ attributes: ['customer_id', 'customer_name','customer_phoneno','customer_address'], 
    where: {
        deletflag: 0,
    customer_id : event.pathParameters.id},
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
