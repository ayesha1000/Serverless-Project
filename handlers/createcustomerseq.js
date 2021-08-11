const connectToDatabase = require('./../configs/db');

function HTTPError (statusCode, message) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
  }

module.exports.handler = async(event) => {
  try{
    const {customer_id,customer_name,customer_phoneno, customer_address} = JSON.parse(event.body)
    const {Customer} = await connectToDatabase();
    const customer = await Customer.create({ customer_id: customer_id, customer_name: customer_name, customer_phoneno: customer_phoneno,customer_address: customer_address})
    if(!customer) {
      throw new HTTPError(404,'Could not create Customer')
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
