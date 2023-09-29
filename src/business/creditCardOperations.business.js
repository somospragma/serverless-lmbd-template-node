const { Context } = require("../patterns/strategy/bodyRequest/context/contextManage.context");
const { JsonSchemaValidator } = require("../validators/validateOrError/jsonSchemaValidator.validate");
const { timeStamp } = require("../utils/general/timeStamp.util");
const axios = require('axios');
const {
    SecretsManager
} = require("@aws-sdk/client-secrets-manager");
const secretsManager = new SecretsManager();

exports.CreditCardOperationsBusiness = class CreditCardOperationsBusiness{
    constructor(typeRequest, event){
        this._typeRequest = typeRequest;
        this._event = event; 
    }

    setContextPetition(){
        this._context = new Context(this._typeRequest, this._event);
        this._context.setStrategy();
    }

    getBody(){
        this._context.chooseStrategy();
        return this._context.getAction();
    }

    validateBodyRequest(data, schema, msnError){
        JsonSchemaValidator(data, schema, msnError);
    }

    async getSecret(secretName){

        const secret = await secretsManager.getSecretValue({ SecretId: secretName });
        const secretValue = JSON.parse(secret.SecretString);
        
        return secretValue;
    } 

    async getCardStatus(data, secrets){
        let response = null;
        const headers = {
            'Content-Type': 'application/json',  
            "apiKey": secrets.apiKey
        };
        console.log(headers);
        const body = {
          ...data,
          appVersion: secrets.appVersion, 
          appID: secrets.appID,      
        };
        console.log(body);
        try {
            response = await axios.post(process.env.urlServiceOperations+"/getCardStatus", body, {
                headers  
            });
        } catch (err){
            console.log(err);
            const error = new Error("Origins: "+err.response.statusText );
            error.validation = null;
            error.statusCode = err.response.status;
            error.statusMessage = "ICONN: "+ err.response.statusText;
            error.time = timeStamp();
            throw error;
        }

        return responese;
         
    }
}