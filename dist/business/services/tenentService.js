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
exports.TenantService = void 0;
const emailManager_1 = require("../../config/email/emailManager");
const fileUploader_1 = require("../../config/fileUpload/fileUploader");
const tenantDAO_1 = require("../../dataAccess/dao/tenantDAO");
const verifyAndAddInputTenant_1 = __importDefault(require("../../dataAccess/inputs/tenants/verifyAndAddInputTenant"));
const saveOTPCodeInputTenant_1 = require("../../dataAccess/inputs/tenants/saveOTPCodeInputTenant");
const verifyOTPInputTenant_1 = require("../../dataAccess/inputs/tenants/verifyOTPInputTenant");
const registerDtoOutTenant_1 = require("../dtoOut/tenants/registerDtoOutTenant");
const signInInputTenant_1 = require("../../dataAccess/inputs/tenants/signInInputTenant");
const signInDtoOutTenant_1 = require("../dtoOut/tenants/signInDtoOutTenant");
const searchUnitsInputTenant_1 = require("../../dataAccess/inputs/tenants/searchUnitsInputTenant");
const searchUnitsDtoOutTenant_1 = require("../dtoOut/tenants/searchUnitsDtoOutTenant");
const unitDetailsDtoOutTenant_1 = require("../dtoOut/tenants/unitDetailsDtoOutTenant");
/**
 * This file handles the business logic for tentant request.
 */
class TenantService {
    constructor() {
        // It handles send-otp request
        this.sendOtp = (serviceFields) => __awaiter(this, void 0, void 0, function* () {
            try {
                const otpCode = yield this.tenantDao.saveOTPCode(saveOTPCodeInputTenant_1.SaveOTPCodeInputTenant.mapSendOTPDtoInTenantToSaveOTPCodeInputTenant(serviceFields));
                const text = `Your otp is ${otpCode}`;
                emailManager_1.EmailManager.sendNotificationEmail(serviceFields.email_address, "Regsitration OTP", text);
            }
            catch (e) {
                throw e;
            }
        });
        /**
         * It handles verify-otp request
         * @param serviceFields stores the required fields.
         * @returns Promise<boolean> ; it is true if the given code is correct.
         */
        this.verifyOTP = (serviceFields) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isValid = this.tenantDao.verifyOTP(verifyOTPInputTenant_1.VerifyOTPInputTenant.mapVerifyOTPDtoInTenantToVerifyOTPInputTenant(serviceFields));
                return isValid;
            }
            catch (e) {
                throw e;
            }
        });
        /**
         * It handles register request
         * @param serviceFields stores the required fields.
         */
        this.register = (serviceFields) => __awaiter(this, void 0, void 0, function* () {
            try {
                let daoInputs = verifyAndAddInputTenant_1.default.mapRegisterDtoInTenant(serviceFields);
                let fileUrl = null;
                console.log("in service", serviceFields, (serviceFields.profile_image !== null), (serviceFields.profile_image.mimetype.includes("image")));
                // upload image
                if (serviceFields.profile_image !== null && serviceFields.profile_image.mimetype.includes("image")) {
                    fileUrl = yield fileUploader_1.FileUploader.uploadProfileImage(serviceFields.profile_image);
                    daoInputs.profile_image = fileUrl;
                }
                console.log("innn", fileUrl);
                // add tenant
                const insertedId = yield this.tenantDao.verifyAndAddTenant(daoInputs);
                return new registerDtoOutTenant_1.RegisterDtoOutTenant(fileUrl, insertedId);
            }
            catch (e) {
                throw e;
            }
        });
        /**
         * It checks the given email if it has been used by other users.
         * @param emailAddress represents the target email.
         * @returns true if it has not been used.
         */
        this.verifyEmail = (emailAddress) => __awaiter(this, void 0, void 0, function* () {
            try {
                const wasNotUsed = yield this.tenantDao.verifyEmail(emailAddress);
                return wasNotUsed;
            }
            catch (e) {
                throw e;
            }
        });
        /**
         * It verifies credientials and retirives profile info.
         * @param serviceFields stores the required fields.
         */
        this.signIn = (serviceFields) => __awaiter(this, void 0, void 0, function* () {
            try {
                let daoInputs = signInInputTenant_1.SignInInputTenant.mapSignInDtoInTenantToSignInInputTenant(serviceFields);
                const result = yield this.tenantDao.loadUserInfo(daoInputs);
                return signInDtoOutTenant_1.SignInDtoOutTenant.mapUserInfoOutputTenantToSignInDtoOutTenant(result);
            }
            catch (e) {
                throw e;
            }
        });
        /**
         * It searches and retireves the available housing units.
         * @param serviceFields stores the required fields.
         */
        this.searchUnits = (serviceFields) => __awaiter(this, void 0, void 0, function* () {
            try {
                let daoInputs = searchUnitsInputTenant_1.SearchUnitsInputTenant.mapSearchUnitsDtoTenantToSearchUnitsInputTenant(serviceFields);
                const daoOutput = yield this.tenantDao.searchUnit(daoInputs);
                const output = daoOutput.map((unit) => {
                    return searchUnitsDtoOutTenant_1.SearchUnitsDtoOutTenant.mapSearchUnitsOutputTenantToSearchUnitsDtoOutTenant(unit);
                });
                return output;
            }
            catch (e) {
                throw e;
            }
        });
        // It retirves the details of the given housing unit
        this.retireveUnitDetail = (unit_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const daoOutput = yield this.tenantDao.loadUnitDetails(unit_id);
                return unitDetailsDtoOutTenant_1.UnitDetailsDtoOutTenant.mapUnitDetailsOutputTenantToUnitDetailsDtoOutTenant(daoOutput);
            }
            catch (e) {
                throw e;
            }
        });
        this.tenantDao = new tenantDAO_1.TenantDAO();
    }
}
exports.TenantService = TenantService;
