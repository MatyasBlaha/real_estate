import encrypt from "./encryptText.utils.js";

export const cookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: false,
}

export const setSessionAndCookies = async (req, res, user) => {
    req.session.userId = user.id;
    req.session.username = user.first_name;

    const encryptedName = await encrypt(user.first_name)

    res.cookie('session', user.id, cookieOptions);
    res.cookie('username', encryptedName, cookieOptions);
}