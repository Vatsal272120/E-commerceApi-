// file to encrypt and decrypt passwords
const CryptoJS = require('crypto-js');

const secret = process.env.ENCRYPT_DECRYPT_SECRET_KEY;

// fn ref:  https://www.npmjs.com/package/crypto-js

const ecryptPassword = (password) => {
  CryptoJS.AES.encrypt(password, secret);
};

const decryptedPassword = (cipherText) => {
  let hashedText = CryptoJS.AES.decrypt(cipherText, secret);
  const decryptPassword = hashedText.toString(CryptoJS.enc.Utf8);

  return decryptPassword;
};

module.exports = { ecryptPassword, decryptedPassword };
