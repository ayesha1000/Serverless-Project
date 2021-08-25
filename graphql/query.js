const connectToDatabase = require('./../configs/db');

export const customerbyid = async(parent, args, context, info) =>{
    const {Customer} = await connectToDatabase();
    const res = await Customer.findOne({ attributes: ['customer_id', 'customer_name','customer_phoneno','customer_address', 'deletflag'], 
    where:{                
        customer_id: args.customer_id}})
    return res.dataValues;
}


export const customers = async() => {
    const {Customer} = await connectToDatabase();
    const res = await Customer.findAll({ attributes: ['customer_id','customer_name','customer_phoneno','customer_address', 'deletflag'],}) 
    return res;
}