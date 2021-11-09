const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const initVector = process.env.CRYPTO_INIT_VECTOR;
const Securitykey = process.env.CRYPTO_SECURE_KEY;

const encryptMessage = message => {
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

  let encryptedData = cipher.update(message, 'utf8', 'hex');

  encryptedData += cipher.final('hex');

  return encryptedData;
};

const decryptMessage = message => {
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

  let decryptedData = decipher.update(message, 'hex', 'utf8');

  decryptedData += decipher.final('utf8');

  return decryptedData;
};

module.exports = {
  encryptMessage,
  decryptMessage,
};
