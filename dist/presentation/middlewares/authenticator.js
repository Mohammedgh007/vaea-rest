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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * It handles generating and verifying jwt tokens.
 */
class Authenticator {
}
_a = Authenticator;
Authenticator.TENANT_USER_TYPE = "TENANT";
/**
 * It generates jwt token for the given user info.
 * @param userId stores the user id
 * @param userType stores user type in the same format as this class constants.
 * @returns the token string
 */
Authenticator.generateToken = (userId, userType) => __awaiter(void 0, void 0, void 0, function* () {
    // setup the jwt payload 
    const payload = {
        user_id: userId,
        user_type: userType
    };
    // generate the token 
    try {
        return yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "120d" });
    }
    catch (e) {
        console.log("error in generating jwt token", e);
        throw e;
    }
});
Authenticator.verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get the token value
    const bearerHeader = req.headers["authorization"];
    const bearer = bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(" ");
    const token = bearer[1];
    // verify token
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        if (req.method === "GET") {
            req.query.user_id = payload.user_id;
            req.query.user_type = payload.user_type;
        }
        else {
            req.body.user_id = payload.user_id;
            req.body.user_type = payload.user_type;
        }
        next();
    }
    catch (e) {
        //console.log("error in auth token ", e)
        res.sendStatus(403);
    }
});
exports.Authenticator = Authenticator;
