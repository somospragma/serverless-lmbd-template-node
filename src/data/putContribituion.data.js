const AWS = require("aws-sdk");
const { timeStamp } = require("../utils/general/timeStamp.util");
const { msn } = require("../const/msn.const");
const { id }  = require("../utils/dynamo/idGenerator.utils");


const getNewContribution = (amount, reference) =>{
    return {
        amount,
        idContributionFvp: id(),
        reference,
        statusContribution: 1,
        timeRegesiter: timeStamp()
    }
}

module.exports.putFpvContribution = (amount, index, idFvp, uniqueIdUser, reference, registerAmount) => {

    const paramsData = {
        TableName: `${process.env.tableBankName}`,
        Key: {
            "idFvp": idFvp,
            "uniqueIdUser": uniqueIdUser
        },
        UpdateExpression: `set contribution[${index}] = :r, currencyAmount = :registerAmount`,
        ConditionExpression: "idFvp = :idFvp AND uniqueIdUser = :uniqueIdUser",
        ExpressionAttributeValues:{
            ':r' :  getNewContribution(amount, reference),
            ':idFvp': idFvp,
            ':uniqueIdUser': uniqueIdUser,
            ':registerAmount': registerAmount
        },
        ReturnValues:"UPDATED_NEW"

    };
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    return dynamoDb.update(paramsData, (err, data) => {
        if (err) {
            console.log(err);
            const error = new Error(msn.ERRORPUTCONTRIBUTION);
            error.validation = null;
            error.statusCode = 500;
            error.statusMessage = msn.ERRORPUTCONTRIBUTION;
            error.time = timeStamp();
            throw error;
        } 
    }).promise();
} 