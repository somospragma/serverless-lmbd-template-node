const scan = (tableName, fields) => {
    let exp = {
        TableName: `${tableName}`,
        FilterExpression: '',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
    };

    Object.entries(fields).forEach(([key, item]) => {
        exp.FilterExpression += ` #${key} = :${key} AND`,
        exp.ExpressionAttributeNames[`#${key}`] = key,
        exp.ExpressionAttributeValues[`:${key}`] = item
    });

    exp.FilterExpression     = exp.FilterExpression.slice(0,-4);
    return exp;
}; 

module.exports.scan = scan;