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
exports.setupTenantRouter = exports.tenantRouter = void 0;
/**
 * This file hanldes recieving the request and then sending the proper response
 * utilizing the business layer. In addition, middlewares are called here.
 * @pre-condition setupTenantRouter() must be called before calling app.use
 */
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const authenticator_1 = require("../middlewares/authenticator");
const sendOTPRequestTenant_1 = require("../requests/tenants/sendOTPRequestTenant");
const tenentService_1 = require("../../business/services/tenentService");
const sendOTPDtoInTenant_1 = require("../../business/dtoIn/tenants/sendOTPDtoInTenant");
const verifyOTPRequestTenant_1 = require("../requests/tenants/verifyOTPRequestTenant");
const verifyOTPDtoInTenant_1 = require("../../business/dtoIn/tenants/verifyOTPDtoInTenant");
const registerRequestTenant_1 = require("../requests/tenants/registerRequestTenant");
const registerDtoInTenant_1 = require("../../business/dtoIn/tenants/registerDtoInTenant");
const registerResponseTenant_1 = require("../responses/tenants/registerResponseTenant");
const signInRequestTenant_1 = require("../requests/tenants/signInRequestTenant");
const signInDtoIntTenant_1 = require("../../business/dtoIn/tenants/signInDtoIntTenant");
const signInResponseTenant_1 = require("../responses/tenants/signInResponseTenant");
const searchUnitsRequestTenant_1 = require("../requests/tenants/searchUnitsRequestTenant");
const SearchUnitsDtoTenant_1 = require("../../business/dtoIn/tenants/SearchUnitsDtoTenant");
const unitsSearchResponseTenant_1 = require("../responses/tenants/unitsSearchResponseTenant");
const unitDetailsResponseTenant_1 = require("../responses/tenants/unitDetailsResponseTenant");
const MIN_MOBILE_VERSION = "1.0.0";
const upload = (0, multer_1.default)({ dest: "./uploads" });
// this router recieves requests and sends responses. Also, It handles calling
// middleware
exports.tenantRouter = express_1.default.Router(); // password input must be less than 55
let tenantService;
const setupTenantRouter = () => {
    tenantService = new tenentService_1.TenantService();
};
exports.setupTenantRouter = setupTenantRouter;
// this route is used to return the minimum version number for the mobile app to 
// use this rest api.
exports.tenantRouter.get("/get-minimum-mobile-version", (req, res) => {
    console.log("recv");
    res.send({
        status: 1,
        data: {
            minimum_version: MIN_MOBILE_VERSION
        }
    });
});
// this route is used to request sending otp
exports.tenantRouter.post("/send-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestFields = sendOTPRequestTenant_1.SendOTPRequestTenant.mapJsonToSendOTPRequestTenant(req.body);
        yield tenantService.sendOtp(sendOTPDtoInTenant_1.SendOTPDtoInTenant.mapSendOTPRequestTenantToSendOTPDtoIn(requestFields));
        res.send({
            status: 0,
            data: null
        });
    }
    catch (e) {
        res.sendStatus(400);
    }
}));
// this route is used to verify the otp code
exports.tenantRouter.post("/verify-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestFields = verifyOTPRequestTenant_1.VerifyOTPRequestTenant.mapJsonToVerifyOTPRequestTenant(req.body);
        const isValid = yield tenantService.verifyOTP(verifyOTPDtoInTenant_1.VerifyOTPDtoInTenant.mapVerifyOTPRequestTenantToVerifyOTPDtoInTenant(requestFields));
        if (isValid) {
            res.send({
                status: 0,
                data: null
            });
        }
        else {
            res.send({
                status: -1,
                data: null
            });
        }
    }
    catch (e) {
        res.sendStatus(400);
    }
}));
// this route is used to sign up tenants
exports.tenantRouter.post("/register", upload.single("profile_image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestFields = registerRequestTenant_1.RegisterRequestTenant.mapJsonToRegisterRequestTenant(req);
        const dtoOut = yield tenantService.register(registerDtoInTenant_1.RegisterDtoInTenant.mapRegisterRequestTenantToRegisterDtoInTenant(requestFields));
        const userAuthToken = yield authenticator_1.Authenticator.generateToken(dtoOut.userId, "TENANT");
        const responseData = new registerResponseTenant_1.RegisterResponseTenant(dtoOut.profileImageUrl, userAuthToken);
        res.send({
            status: 1,
            data: responseData
        });
    }
    catch (e) {
        res.sendStatus(400);
    }
}));
// This route is used to verify that the given email has not been used by other users.
exports.tenantRouter.get("/verify-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wasNotUsed = yield tenantService.verifyEmail(req.query.email_address);
        res.send({
            status: 1,
            data: {
                "was_not_used": wasNotUsed
            }
        });
    }
    catch (e) {
        res.sendStatus(400);
    }
}));
// this route is used sign in tenants
exports.tenantRouter.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestFields = signInRequestTenant_1.SignInRequestTenant.mapJsonToSignInRequestTenant(req);
        const serviceOutput = yield tenantService.signIn(signInDtoIntTenant_1.SignInDtoInTenant.mapSignInRequestTenantToSignInDtoInTenant(requestFields));
        const authToken = yield authenticator_1.Authenticator.generateToken(serviceOutput.user_id, authenticator_1.Authenticator.TENANT_USER_TYPE);
        let responseData = signInResponseTenant_1.SignInResponseTenant.mapSignInDtoOutTenantToSignInResponseTenant(serviceOutput, authToken);
        res.send({
            status: 1,
            data: responseData
        });
    }
    catch (e) {
        res.sendStatus(400);
    }
}));
// this route is used to view tenant lease by his/her tenant
exports.tenantRouter.get("/view-lease", authenticator_1.Authenticator.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send({
            status: 0,
            data: null
        });
    }
    catch (e) {
        res.sendStatus(400);
    }
}));
// this route is used to search for the available housing units
exports.tenantRouter.get("/search-units", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestFields = searchUnitsRequestTenant_1.SearchUnitsRequestTenant.mapJsonToSearchUnitsRequestTenant(req);
        console.log(requestFields);
        const serviceInputs = SearchUnitsDtoTenant_1.SearchUnitsDtoTenant.mapSearchUnitsRequestTenantToSearchUnitsDtoTenant(requestFields);
        const serviceOutput = yield tenantService.searchUnits(serviceInputs);
        const responseData = serviceOutput.map((unit) => unitsSearchResponseTenant_1.SearchUnitsResponseTenant.mapSearchUnitsDtoOutTenantToSearchUnitsResponseTenant(unit));
        res.send({
            status: (responseData.length == 0) ? 0 : 1,
            data: responseData
        });
    }
    catch (e) {
        res.sendStatus(400);
    }
}));
// This route is used to retireves the details of the given housing unit.
exports.tenantRouter.get("/unit_details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unit_id = req.query.unit_id;
        if (unit_id == undefined) {
            res.send({
                status: -1,
                data: null
            });
        }
        else {
            const serviceOutput = yield tenantService.retireveUnitDetail(unit_id);
            const responseData = unitDetailsResponseTenant_1.UnitDetailsResponseTenant.mapUnitDetailsOutputTenantToUnitDetailsResponseTenant(serviceOutput);
            res.send({
                status: 1,
                data: responseData
            });
        }
    }
    catch (e) {
        res.sendStatus(400);
    }
}));
