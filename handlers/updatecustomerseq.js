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
   
    const custom ={
        customer_id : JSON.stringify(customer[0].customer_id),
        customer_name: JSON.stringify(customer[0].customer_name),
        customer_phoneno: JSON.stringify(customer[0].customer_phoneno),
        customer_address: JSON.stringify(customer[0].customer_address)
    }

    const {customer_id,customer_name, customer_phoneno, customer_address} = {...custom,...JSON.parse(event.body)}
    console.log(customer_name)
    console.log(customer_address)

    await Customer.update({customer_name: customer_name, customer_phoneno: customer_phoneno, customer_address: customer_address },{
        where: {
        customer_id : event.pathParameters.id},
        })


    if(!customer) {
      throw new HTTPError(404,'Could not update Customers')
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
