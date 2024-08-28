import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const apiKey = process.env.REACT_APP_ENCRYPTION_KEY;

const decrypt = (encryptedText) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, apiKey).toString(CryptoJS.enc.Utf8);
    return bytes.toString(CryptoJS.enc.Utf8)
}

const getUsernameFromCookies = (): string | undefined => {
    const encryptedUsername = Cookies.get('username');
    if (encryptedUsername) {
        return decrypt(encryptedUsername);
    }
    return undefined;
};

const getProfileIdFromCookies = (): string | undefined => {
    const encryptedProfileId = Cookies.get('profileId');
    if (encryptedProfileId) {
        return encryptedProfileId
    }
    return undefined;
};

export { getUsernameFromCookies, getProfileIdFromCookies}