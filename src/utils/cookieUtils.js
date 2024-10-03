// src/utils/cookieUtils.js

import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = "your_secret_key"; // Use a secure secret key

export const setEncryptedCookie = (cookieName, data, options = {}) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
  Cookies.set(cookieName, encryptedData, options);
};

export const getDecryptedCookie = (cookieName) => {
  const encryptedData = Cookies.get(cookieName);
  if (encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
  return null; // No cookie found
};

export const removeCookie = (cookieName, options = {}) => {
  Cookies.remove(cookieName, options);
};
