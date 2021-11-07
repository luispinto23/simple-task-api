const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const initVector = process.env.CRYPTO_INIT_VECTOR;
const securitykey = process.env.CRYPTO_SECURE_KEY;

const encryptMessage = (message, iv = initVector, key = securitykey) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encryptedData = cipher.update(message, 'utf8', 'hex');

  encryptedData += cipher.final('hex');

  return encryptedData;
};

const decryptMessage = (message, iv = initVector, key = securitykey) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decryptedData = decipher.update(message, 'hex', 'utf8');

  decryptedData += decipher.final('utf8');

  return decryptedData;
};

module.exports = {
  encryptMessage,
  decryptMessage,
};
