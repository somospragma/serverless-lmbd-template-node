const {
          DynamoDBDocument
      } = require("@aws-sdk/lib-dynamodb"),
      {
          DynamoDB
      } = require("@aws-sdk/client-dynamodb");
const { timeStamp } = require("../utils/general/timeStamp.util");
const { msn } = require("../const/msn.const");

module.exports.putItem = async (params, tableName) => {
    const paramsData = {
        TableName: `${tableName}`,
        Item: params,
        ReturnValues: "ALL_OLD"
    };
    const dynamoDb = DynamoDBDocument.from(new DynamoDB());
    await dynamoDb.put(paramsData, (err, data) => {
        if (err) {
            console.log(err);
            const error = new Error(msn.DYNAMOPUTITEM);
            error.validation = null;
            error.statusCode = 500;
            error.statusMessage = msn.DYNAMOPUTITEM;
            error.time = timeStamp();
            throw error;
        } 
    });
} 
