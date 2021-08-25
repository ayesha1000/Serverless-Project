const connectToDatabase = require('./../configs/db');
import { customerbyid, customers } from "./query";
import { createCustomer, deleteCustomer, updateCustomer } from "./mutations";

export const resolvers = {
    Query:{   
       
        customerbyid: customerbyid,
        customers: customers   
    }, 

    Mutation: {
        createCustomer: createCustomer,
        deleteCustomer: deleteCustomer,
        updateCustomer: updateCustomer

    }
    
}
