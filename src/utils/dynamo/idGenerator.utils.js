const crypto = require("crypto");

module.exports.id = () => {
    return crypto.randomBytes(16).toString("hex");
} 