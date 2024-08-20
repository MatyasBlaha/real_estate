import { emailVerification } from "./emailVerification.service.ts";

const HandleEmailVerification = (token) => {
    console.log(token);
    emailVerification(token);
};

export default HandleEmailVerification;