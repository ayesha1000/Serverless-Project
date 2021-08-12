const connectToDatabase = require('./../configs/db');

module.exports.checkconnection = async() =>{
    await connectToDatabase();
    console.log('Connection successful');

    return{
        statusCode : 200,
        body : JSON.stringify({message : 'Connection successful'})
    }
}