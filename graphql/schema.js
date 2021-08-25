const {ApolloServer, gql} = require('apollo-server-lambda');

const typeDefs = gql`
type Customer {
    customer_id: Int
    customer_name: String
    customer_address: String
    customer_phoneno: String
    deletflag: Int
}
type Query {
    customerbyid (customer_id: Int!): Customer
    customers: [Customer]
}
type Mutation {
    createCustomer (customer_id: Int!, customer_name: String!, customer_phoneno: String!, customer_address: String! ): Customer
    deleteCustomer (customer_id: Int!) : String
    updateCustomer (customer_id: Int!, customer_name: String, customer_phoneno: String, customer_address: String): String
}
`;

export { typeDefs }
