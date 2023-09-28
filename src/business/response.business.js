const { timeStamp } = require("../utils/general/timeStamp.util");
const { headers } = require("../utils/response/headers.utils");

exports.ResponseBusiness = class ResponseBusiness{
    constructor(statusCode, statusMessage, payload){
        this._statusCode = statusCode;
        this._statusMessage = statusMessage;
        this._payload = payload;
    }

    getResponse(){
        const payloadResponse = {
            data: this._payload,
            time: timeStamp(),
            statusMessage: this._statusMessage
        };

        return {
            statusCode: this._statusCode, 
            headers: headers(),
            body: JSON.stringify(payloadResponse)
        }
    }
}