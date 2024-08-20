import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const decrypt = (encryptedText) => {
    console.log("API Key:", apiKey);  // Check if this prints the correct key

    const bytes = CryptoJS.AES.decrypt(encryptedText, apiKey).toString(CryptoJS.enc.Utf8);
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