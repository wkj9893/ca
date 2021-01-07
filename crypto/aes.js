'use strict';

const CryptoJS = require("crypto-js");


function encrypt(message, passphrase) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(message), passphrase).toString();
    return encrypted;
};

function decrypt(encrypted, passphrase) {
    const bytes = CryptoJS.AES.decrypt(encrypted, passphrase);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
};


module.exports = {
    encrypt,
    decrypt
}