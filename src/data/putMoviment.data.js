const {
          DynamoDBDocument
      } = require("@aws-sdk/lib-dynamodb"),
      {
          DynamoDB
      } = require("@aws-sdk/client-dynamodb");
const { timeStamp } = require("../utils/general/timeStamp.util");
const { msn } = require("../const/msn.const");
const { id }  = require("../utils/dynamo/idGenerator.utils");


const getNewMovement = (amount, reference) =>{
    return {
        amount,
        idMoviment: id(),
        reference,
        status: 1,
        timeRegesiter: timeStamp()
    }
}

module.exports.putMoviment = (amount, index, idUser, uniqueIdUser, reference, registerAmount) => {
    
    const paramsData = {
        TableName: `${process.env.tableFounds}`,
        Key: {
            "idUser": idUser,
            "uniqueIdUser": uniqueIdUser
        },
        UpdateExpression: `set moviment[${index}] = :r, currencyAmount = :registerAmount`,
        ConditionExpression: "idUser = :idUser AND uniqueIdUser = :uniqueIdUser",
        ExpressionAttributeValues:{
            ':r' :  getNewMovement(amount, reference),
            ':idUser': idUser,
            ':uniqueIdUser': uniqueIdUser,
            ':registerAmount': registerAmount
        },
        ReturnValues:"UPDATED_NEW"

    };
    const dynamoDb = DynamoDBDocument.from(new DynamoDB());
    return dynamoDb.update(paramsData, (err, data) => {
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
