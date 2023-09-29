const {
          DynamoDBDocument
      } = require("@aws-sdk/lib-dynamodb"),
      {
          DynamoDB
      } = require("@aws-sdk/client-dynamodb");
const { timeStamp } = require("../utils/general/timeStamp.util");
const { msn } = require("../const/msn.const");
const { scan } = require("../utils/dynamo/scan.utils")

module.exports.queryItems = async (params, tableName) => {
    const queryDynamo = scan(tableName,params);

    const paramsData = {
        TableName: `${tableName}`,
        ...queryDynamo
    };

    const dynamoDb = DynamoDBDocument.from(new DynamoDB());
    
    return dynamoDb.scan(paramsData, (err, data) => {
        if (err) {
            const error = new Error(msn.DYNAMOPUTITEM);
            error.validation = null;
            error.statusCode = 500;
            error.statusMessage = msn.DYNAMOPUTITEM;
            error.time = timeStamp();
            throw error;
        }
    });

} 