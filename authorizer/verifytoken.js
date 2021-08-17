const jwt = require('jsonwebtoken');

const generatePolicy = (principalId, effect, resource) =>{
    const authResponse = {};
    authResponse.principalId = principalId;
    if(effect && resource) {
        const policyDocument ={};
        policyDocument.Version ='2021-08-16';
        policyDocument.Statement = [];
        const StatementOne = {};
        StatementOne.Action = 'execute-api:Invoke';
        StatementOne.Effect = effect;
        StatementOne.Resource = resource;
        policyDocument.Statement[0] =StatementOne;
        authResponse.policyDocument = policyDocument;

    }
    return authResponse;
}

module.exports.authorizer = (event, context, callback)=> {
    if(!event.authorizationToken){
        throw new Error("Unauthorized")
    }
    console.log(event)
    const token = event.authorizationToken.split(' ')[1];
    var newtoken = jwt.sign({ id: 'customer' }, token);
   
    jwt.verify(newtoken, 'abc123', (err,decoded)=>{
        if(err){
            return callback(null, generatePolicy(decoded.id, 'Deny', event.methodArn))
        }
        return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn))
    });
}