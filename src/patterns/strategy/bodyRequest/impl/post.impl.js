function jsonEscape(str)  {
    return str.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "");
}

const getBody = (data) => {
    if(data.isBase64Encoded !== undefined &&  data.isBase64Encoded  === true){
        const buff = Buffer.from(data.body, "base64");
        const str = buff.toString("utf-8"); 
        return JSON.parse(str);
    }
    if(typeof data.body === "string" ){
        data.body = jsonEscape(data.body);
        return JSON.parse(data.body);
    }
    return data;
}



module.exports.post = (eventRequest) => {
    return !!eventRequest ? getBody(eventRequest): null; 
}
