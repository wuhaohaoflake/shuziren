import * as CryptoJS from 'crypto-js';
let AuthTokenKey = CryptoJS.enc.Utf8.parse('02daf79adc5c44ac'); //AES密钥

/*AES加密*/
export function Encrypt(data: any) {
  if (!data) {
    console.error('参数不能为空');
    return '';
  }
  let dataStr = JSON.stringify(data);
  let encrypted = CryptoJS.AES.encrypt(dataStr, AuthTokenKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

/*AES解密*/
export function Decrypt(data: any) {
  if (!data) {
    console.error('参数不能为空');
    return '';
  }
  let decrypted = CryptoJS.AES.decrypt(data, AuthTokenKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypted).toString();
}
