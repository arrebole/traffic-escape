const crypto = require('crypto');

function newHashBase64(str){
    const hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
}

module.exports = newHashBase64;