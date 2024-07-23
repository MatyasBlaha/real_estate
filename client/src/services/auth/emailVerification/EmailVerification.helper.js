import { emailVerification } from "./emailVerification.service";

const HandleEmailVerification = (token) => {
    console.log(token);
    emailVerification(token);
};

export default HandleEmailVerification;