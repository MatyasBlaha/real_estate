import {Request, Response as ExpressResponse} from "express";
import {updateLastLoginTimeStamp} from "../../repository/login.repository";
import { setSessionCookies, setUserIdCookies, setUsernameCookies, setProfileIdCookies} from "../../utils/cookie.utils";

export const finalizeLoginRequest = async (res: ExpressResponse, req: Request, user: any, profile: any) => {
    await updateLastLoginTimeStamp(user.id);
    await setSessionCookies(req, res)
    await setUserIdCookies(req, res, user)
    await setUsernameCookies(req, res, user)

    if(profile !== null) {
        await setProfileIdCookies(req, res, profile);
    }
};
