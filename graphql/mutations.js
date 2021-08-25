const connectToDatabase = require('./../configs/db');

export const createCustomer = async (parent, args, context, info) =>{
    const {Customer} = await connectToDatabase();
    const customer = await Customer.create({ customer_id: args.customer_id, customer_name: args.customer_name, customer_phoneno: args.customer_phoneno,customer_address: args.customer_address})
    return customer;
}

export const deleteCustomer = async(parent, args, context, info) =>{
    const {Customer} = await connectToDatabase();
    const customer = await Customer.update({deletflag : 1 },{
        where: {
        customer_id : args.customer_id},
        })
    return "Customer deleted"
}

export const updateCustomer = async(parent, args, context, info) =>{
    const {Customer} = await connectToDatabase();
    const customer = await Customer.findOne({ attributes: ['customer_id', 'customer_name','customer_phoneno','customer_address', 'deletflag'], 
    where: { customer_id: args.customer_id}})

    const {customer_id,customer_name,customer_phoneno, customer_address, deletflag} = {...customer.dataValues,...args}
    const res = await Customer.update({customer_id: customer_id, customer_name: customer_name, customer_phoneno: customer_phoneno, customer_address: customer_address},
        {where: {customer_id: args.customer_id}})

    return "Customer updated successfully";

}