import crypto from "crypto";
import CryptoJS from "crypto-js";

import loadEnvFile from "../../../../env/config.js";
loadEnvFile('.env.security');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

const encrypt = async (text) => {
    const encryptedName =  CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
    return encryptedName;
};

export default encrypt;