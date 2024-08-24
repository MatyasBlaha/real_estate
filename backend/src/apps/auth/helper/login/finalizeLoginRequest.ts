import {Request, Response as ExpressResponse} from "express";
import {updateLastLoginTimeStamp} from "../../repository/login.repository";
import {setSessionAndCookies} from "../../utils/cookie.utils";

export const finalizeLoginRequest = async (res: ExpressResponse, req: Request, user: any) => {
    await updateLastLoginTimeStamp(user.id);
    await setSessionAndCookies(req, res, user);
};
