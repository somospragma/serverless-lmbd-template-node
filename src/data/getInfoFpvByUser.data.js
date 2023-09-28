const AWS = require("aws-sdk");
const { timeStamp } = require("../utils/general/timeStamp.util");
const { msn } = require("../const/msn.const");
const { scan } = require("../utils/dynamo/scan.utils")

module.exports.getInfoFpvByUser = async (uniqueIdUser) => {

    const params = {
        uniqueIdUser,
        status: 1
    }

    const queryDynamo = scan(`${process.env.tableBankName}`,params);
    
    const paramsData = {
        TableName: `${process.env.tableFounds}`,
        ...queryDynamo,
    };

    console.log(queryDynamo);    

    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    return dynamoDb.scan(paramsData, (err, data) => {
        console.log()
        if (err) {
            console.log(err)
            const error = new Error(msn.ERRORSCAN);
            error.validation = null;
            error.statusCode = 500;
            error.statusMessage = msn.ERRORSCAN;
            error.time = timeStamp();
            throw error;
        }
    }).promise();

}