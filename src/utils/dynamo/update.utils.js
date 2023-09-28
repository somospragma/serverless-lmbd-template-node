const update = (tableName, fields) => {
    let exp = {
        TableName: `${tableName}`,
        UpdateExpression: 'set',
        ReturnValues: "UPDATE_NOW",
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
    };

    Object.entries(fields).forEach(([key, item]) => {
        exp.UpdateExpression += ` #${key} = :${key} AND`,
        exp.ExpressionAttributeNames[`#${key}`] = key,
        exp.ExpressionAttributeValues[`:${key}`] = item
    });

    exp.UpdateExpression = exp.UpdateExpression.slice(0,-1);

    return exp;
}; 

module.exports.update = update;