const jwt = require("jsonwebtoken");


const getJwtToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY);
}


module.exports = { getJwtToken }