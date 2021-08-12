const connectToDatabase = require('./../configs/db');

function HTTPError (statusCode, message) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
  }

module.exports.handler = async(event) => {
  try{
    const {Customer} = await connectToDatabase();
    const customers = await Customer.findAll({ attributes: ['customer_id', 'customer_name','customer_phoneno','customer_address'], 
    where: {deletflag: 0, customer_id: event.pathParameters.id}})
    let name = JSON.stringify(customers[0].customer_name)
    let address = JSON.stringify(customers[0].customer_address)
    let phoneno = JSON.stringify(customers[0].customer_phoneno)
    

    let custom = {customer_id :JSON.stringify(customers[0].customer_id), customer_name : name.substring(1, name.length-1) ,
    customer_phoneno : phoneno.substring(1, phoneno.length-1), customer_address : address.substring(1, address.length-1)}
    const {customer_id,customer_name,customer_phoneno, customer_address} = {...custom,...JSON.parse(event.body)}
    
    await Customer.update({customer_id: customer_id, customer_name: customer_name, customer_phoneno: customer_phoneno, customer_address: customer_address},
        {where: {customer_id: event.pathParameters.id}})

    if(!customers) {
      throw new HTTPError(404,'Could not create Customer')
    }
    return {
      statusCode: 200,
      body : JSON.stringify(customers)
    }

  }
  catch(err) {
    return {
      statusCode : err.StatusCode || 500,
      body : err.message || 'Could not fetch the customers'
    }
   }
  
}
