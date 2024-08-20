import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const decrypt = (encryptedText) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, 'f99e8c6996c9829bd95e7c8aad4bec044945c5b0286b0fdb8769204f50fb0ad3').toString(CryptoJS.enc.Utf8);
    return bytes.toString(CryptoJS.enc.Utf8)
}

const getUsernameFromCookies = () => {
    const encryptedUsername = Cookies.get('username');
    if (encryptedUsername) {
        return decrypt(encryptedUsername);
    }
    return null;
}

export { getUsernameFromCookies }