const jwt = require('express-jwt');
const secret = process.env.TOKEN_SECRET;

module.exports = authorize;

function authorize(roles = []) {
    return jwt({ secret, algorithms: ['HS256'] });
}