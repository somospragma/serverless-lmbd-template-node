const {
          DynamoDBDocument
      } = require("@aws-sdk/lib-dynamodb"),
      {
          DynamoDB
      } = require("@aws-sdk/client-dynamodb");
const { timeStamp } = require("../utils/general/timeStamp.util");
const { msn } = require("../const/msn.const");
const { scan } = require("../utils/dynamo/scan.utils")

module.exports.getCatalogs = async () => {

    const params = {
        status: 1
    }

    const queryDynamo = scan(`${process.env.tableFpvCatalog}`,params);
    
    const paramsData = {
        TableName: `${process.env.tableFpvCatalog}`,
        ...queryDynamo,
    };

    const dynamoDb = DynamoDBDocument.from(new DynamoDB());
    
    return dynamoDb.scan(paramsData, (err, data) => {
        console.log()
        if (err) {
            const error = new Error(msn.ERRORSCAN);
            error.validation = null;
            error.statusCode = 500;
            error.statusMessage = msn.ERRORSCAN;
            error.time = timeStamp();
            throw error;
        }
    });

}