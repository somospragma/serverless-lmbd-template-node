const Validator = require("jsonschema").Validator;
const { timeStamp } = require("../../utils/general/timeStamp.util");

const processErrorData = (res) =>{
    return  {
        name: res.path.length > 0 ? res.path[0] : res.argument,
        message: res.message.replace(/\"/g, "'"),
        value: res.path.length > 0 ? res.argument : null
    }
};

module.exports.JsonSchemaValidator = (data, schema, msnError) => {
    const v = new Validator();
    const validationResult = v.validate(data, schema, {setDefaults: true, clean: true});
    if(!validationResult.valid){
        let errors = [];
       
        validationResult.errors.forEach( res => { errors.push(processErrorData(res))});

        const error = new Error(msnError);
        error.validation = errors.length > 0 ? errors : null;
        error.statusCode = 422;
        error.statusMessage = msnError;
        error.time = timeStamp();
        throw error;

    }
};