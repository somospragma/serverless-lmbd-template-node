const { timeStamp } = require("../utils/general/timeStamp.util");
const { CreditCardOperationsBusiness } = require("../business/creditCardOperations.business");
const { msn } = require("../const/msn.const");
const { ResponseBusiness } = require("../business/response.business");
const { bodyCreditCardStatus } = require("../validators/jsonschema/bodyCreditCardStatus.validate")

module.exports.app = async (event, _context, _callback) => {
    let body = null;
    let response = null;
    try {
      const typeRequest = process.env.typeRequest;

      const creditCardBusiness = new CreditCardOperationsBusiness(typeRequest,event);
      creditCardBusiness.setContextPetition();
      body = creditCardBusiness.getBody();

      creditCardBusiness.validateBodyRequest(body,bodyCreditCardStatus, msn.VLDREQUEST)
      const secrets = await creditCardBusiness.getSecret(process.env.secretName);
      console.log("secret: ", secrets);
      const responseAxios = await creditCardBusiness.getCardStatus(body,secrets);

      response = new ResponseBusiness(200, msn.SUCCESS, responseAxios);

    } catch (error) {
      console.log(error);
      const errorData = {
        validation: !!error.validation ? error.validation: null,
        statusCode: !!error.statusCode ? error.statusCode : 500,
        statusMessage: !!error.statusMessage ? error.statusMessage: msn.INTERNAL,
        time: !!error.time ? error.time  : timeStamp()
      }
  
      response = new ResponseBusiness(errorData.statusCode, errorData.statusMessage, errorData.validation);
  
    } 
    return response.getResponse();
  }
  
  
  