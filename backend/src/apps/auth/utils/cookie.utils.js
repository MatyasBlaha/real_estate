import encrypt from "../../shared/utils/encryptText.utils.js";

export const cookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: false,
};



export const setSessionCookies = async (req, res) => {
    req.session.session = 'adsf5678957dasfh';
    res.cookie('session', req.session.session, cookieOptions);
}

export const setUserIdCookies = async (req, res, user) => {
    req.session.userId = user.id;
    res.cookie('userId', req.session.userId, cookieOptions);
}

export const setUsernameCookies = async (req, res, user) => {
    req.session.username = user.firstName;
    const encryptedName = await encrypt(user.first_name);
    res.cookie('username', encryptedName, cookieOptions);
}

export const setProfileIdCookies = async (req, res, profile) => {
    req.session.profileId = profile.id;
    res.cookie('profileId', req.session.profileId, cookieOptions);
}
