import {Response as ExpressResponse} from "express";
import {User} from "../../interfaces/UserRequestBody";
import userRepository from "../../repository/register.repository";

export const isUserAlreadyRegisteredRequest = async (res: ExpressResponse, email: string): Promise<User | boolean> => {
    const user = await userRepository.checkIfUserAlreadyRegistered(res, email);
    return user ? user : null;
};