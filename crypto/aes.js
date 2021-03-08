import { AES, enc } from "crypto-js";

function encrypt(message, passphrase) {
  const encrypted = AES.encrypt(JSON.stringify(message), passphrase).toString();
  return encrypted;
}

function decrypt(encrypted, passphrase) {
  const bytes = AES.decrypt(encrypted, passphrase);
  const decrypted = JSON.parse(bytes.toString(enc.Utf8));
  return decrypted;
}

export { encrypt, decrypt };
