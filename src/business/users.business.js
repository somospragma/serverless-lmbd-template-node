const { Context } = require("../patterns/strategy/bodyRequest/context/contextManage.context");
const { JsonSchemaValidator } = require("../validators/validateOrError/jsonSchemaValidator.validate");
const { getUserData } = require("../data/getUserData.data");
const { timeStamp } = require("../utils/general/timeStamp.util");
const { putMoviment } = require("../data/putMoviment.data");
const { getInfoFpvByUser } = require("../data/getInfoFpvByUser.data");
const { msn } = require("../const/msn.const");

exports.Users = class Users{
    constructor(typeRequest, event){
        this._typeRequest = typeRequest;
        this._event = event;
    }

    setContextPetition(){
        this._context = new Context(this._typeRequest, this._event);
        this._context.setStrategy();
    }

    geBody(){
        this._context.chooseStrategy();
        return this._context.getAction();
    }

    validateBodyRequest(data, schema, msnError){
        JsonSchemaValidator(data, schema, msnError);
    }

    async getUserData(uniqueIdUser){
        let dataItems = [];
        let currencyAmountMoney = 0;

        const result = await getUserData(uniqueIdUser);
        console.log(result);
        
        if(result.Count < 1){
            const error = new Error(msn.NOTFOUNDUSER); 
            error.validation = null;
            error.statusCode = 404;
            error.statusMessage = msn.NOTFOUNDUSER;
            error.time = timeStamp();
            throw error;
        } 
        
        
        result.Items[0].moviment.forEach( data => {
            currencyAmountMoney += data.amount;
            dataItems.push(
                {
                    reference: data.reference,
                    amount: data.amount,
                    timeRegesiter: new Date(data.timeRegesiter).toISOString(),
                    status: data.status
                }
            );
        });

        return {
            currencyAmountMoney, 
            moviment: dataItems,
            currencyAmount: result.Items[0].currencyAmount,
            register: result.Items[0].idUser
        };
    }

    async addFoundsUser(amount, index, idUser, uniqueIdUser, reference, registerAmount){
        await putMoviment(amount, index, idUser, uniqueIdUser, reference, registerAmount)
    }

    async getInformationFpvByUser(uniqueIdUser){
        const result =  await getInfoFpvByUser(uniqueIdUser);
        const items = [];
        if(result.Count < 1){
            return {
                items,
                count: 0,
                totalMoney: 0,
            }
        } 

        let currencyAmountMoney = 0;

        result.Items.forEach(
            fpv => {
                currencyAmountMoney += fpv.currencyAmount;
                items.push(
                    {
                        register: fpv.idFvp,
                        category: fpv.category,
                        name: fpv.name,
                        currencyAmount: fpv.currencyAmount,
                        openingDate: new Date(fpv.openingDate).toISOString()
                    }
                );
            }
        )

        return {
            items: items.sort((a,b) => a.openingDate - b.openingDate),
            count: result.Count,
            totalMoney: currencyAmountMoney,
        }


    }
}

