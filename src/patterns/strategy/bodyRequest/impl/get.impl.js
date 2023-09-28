module.exports.get = (eventRequest) => {
    return !!eventRequest.queryStringParameters ? eventRequest.queryStringParameters: null; 
}