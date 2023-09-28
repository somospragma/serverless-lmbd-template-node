const query = (tableName, fields) => {
    let exp = {
        TableName: `${tableName}`,
        KeyConditionExpression: '',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
    };

    Object.entries(fields).forEach(([key, item]) => {
        exp.KeyConditionExpression += ` #${key} = :${key} AND`,
        exp.ExpressionAttributeNames[`#${key}`] = key,
        exp.ExpressionAttributeValues[`:${key}`] = item
    });

    exp.KeyConditionExpression = exp.KeyConditionExpression.slice(0,-4);
    return exp;
}; 

module.exports.query = query;