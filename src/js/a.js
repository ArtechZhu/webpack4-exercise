const corejs  = require('./core.js');
var result = [1,2,3].map(n=>n**2);
console.log("result=%o",result);
module.exports = result;