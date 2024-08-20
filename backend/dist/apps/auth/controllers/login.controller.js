"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const response_js_1 = __importDefault(require("../../shared/models/response.js"));
const HttpStatus_utils_js_1 = __importDefault(require("../../shared/utils/HttpStatus.utils.ts"));
const logger_js_1 = __importDefault(require("../../shared/log/logger.js"));
const response_utils_js_1 = require("../../shared/utils/response.utils.ts");
const login_repository_js_1 = require("../repository/login.repository.js");
const validateLoginInput_service_js_1 = __importDefault(require("../services/login/validateLoginInput.service.ts"));
const verificationPassword_service_js_1 = __importDefault(require("../services/login/verificationPassword.service.ts"));
const cookie_utils_js_1 = require("../utils/cookie.utils.js");
const register_repository_js_1 = __importDefault(require("../repository/register.repository.js"));
const sendVerificationEmail_service_js_1 = __importDefault(require("../services/email/sendVerificationEmail.service.js"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate login input.
        const validationLoginResult = (0, validateLoginInput_service_js_1.default)(email, password);
        if (validationLoginResult.error) {
            return res.status(validationLoginResult.error.code).json((0, response_utils_js_1.createResponse)(validationLoginResult.error.code, validationLoginResult.error.status, validationLoginResult.error.message, null));
        }
        // Check if user exists and is verified in the database.
        const user = yield (0, login_repository_js_1.checkUserExistenceAndVerification)(email);
        if (user.error) {
            return res.status(user.error.code).json((0, response_utils_js_1.createResponse)(user.error.code, user.error.status, user.error.message, null));
        }
        // Check if user exists and is verified in the database.
        if (user.verified !== 1) {
            const token = yield register_repository_js_1.default.saveVerificationTokenToDatabase(user);
            yield (0, sendVerificationEmail_service_js_1.default)(email, token);
            return res.status(HttpStatus_utils_js_1.default.UNAUTHORIZED.code).json(new response_js_1.default(HttpStatus_utils_js_1.default.UNAUTHORIZED.code, HttpStatus_utils_js_1.default.UNAUTHORIZED.status, 'User is not verified, please check email', null));
        }
        // Verify password.
        const verifiedPassword = yield (0, verificationPassword_service_js_1.default)(password, user.password);
        if (typeof verifiedPassword === 'object' && verifiedPassword.error) {
            return res.status(verifiedPassword.error.code).json((0, response_utils_js_1.createResponse)(verifiedPassword.error.code, verifiedPassword.error.status, verifiedPassword.error.message, null));
        }
        //Update last login time to user.
        yield (0, login_repository_js_1.updateLastLoginTimeStamp)(user.id);
        // Create session and username token.
        yield (0, cookie_utils_js_1.setSessionAndCookies)(req, res, user);
        res.status(HttpStatus_utils_js_1.default.OK.code).json((0, response_utils_js_1.createResponse)(HttpStatus_utils_js_1.default.OK.code, HttpStatus_utils_js_1.default.OK.status, 'Login successful', null));
    }
    catch (err) {
        logger_js_1.default.error({ error: err.message });
        return res.status(HttpStatus_utils_js_1.default.INTERNAL_SERVER_ERROR.code).json((0, response_utils_js_1.createResponse)(HttpStatus_utils_js_1.default.INTERNAL_SERVER_ERROR.code, HttpStatus_utils_js_1.default.INTERNAL_SERVER_ERROR.status, 'Internal Server Error', null));
    }
});
exports.login = login;
