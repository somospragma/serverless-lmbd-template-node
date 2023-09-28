const {SQS} = require("aws-sdk");

module.exports.sendFvpError = (message) => {
    const sqs = new SQS();
    const QueueUrl = `${process.env.sqsErrorUrl}`;

    const params = {
        MessageBody: message,
        QueueUrl
    };

    sqs.sendMessage(params, (err, data) => {
        if(err){
            console.log("Error sendFvpError");
        }
    });
}