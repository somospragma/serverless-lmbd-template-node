const bodyCreditCardStatus = {
    id: "bodyCreditCardStatus", 
    type: "object",
    properties: {
        cardnumber: {
            type: "string", 
            pattern: "^[0-9]",
            minLength: 16,
            maxLength: 16
        }, 
        udid: {
            type: "string", 
            pattern: "^[a-z0-9:]",
            minLength: 17,
            maxLength: 17
        },
        longitude: {
            type: "string"
        },
        latitude: {
            type: "string"
        }
    },
    required: ["cardnumber", "udid", "latitude", "longitude"]
}

module.exports = { bodyCreditCardStatus };