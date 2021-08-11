
const connectToDatabase = require('./../configs/db');

module.exports.handler= async() =>{
await connectToDatabase()
console.log('Connection successful');

return {
    statusCode: 200,
    body: JSON.stringify({message: 'Connection Successful'})
}
}