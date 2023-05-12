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
exports.TenantDAO = void 0;
const dbConnectionManager_1 = require("../../config/database/dbConnectionManager");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userInfoOutputTenant_1 = require("../outputs/tenants/userInfoOutputTenant");
const searchUnitsOutputTenant_1 = require("../outputs/tenants/searchUnitsOutputTenant");
const unitDetailsOutput_tenant_1 = require("../outputs/tenants/unitDetailsOutput.tenant");
/**
 * It handles the interaction with the database.
 */
class TenantDAO {
    constructor() {
        // It generates and stores otp code.
        this.saveOTPCode = (queryInputs) => __awaiter(this, void 0, void 0, function* () {
            try {
                let otpCode = Math.round(Math.random() * 100000).toString();
                otpCode = (otpCode.length == 4) ? "0" + otpCode : otpCode;
                const sqlStr = `
            INSERT INTO otp(email_address, otp_code, otp_type) 
            values ('${queryInputs.email_address}', '${otpCode}', '${queryInputs.request_type}');
            `;
                yield this.dbConnect.promise().query(sqlStr);
                return otpCode;
            }
            catch (e) {
                console.log("error in saveOTPCode", e);
                throw e;
            }
        });
        /**
         * queries the database to verify the given otp code, and it marks the otp as being used
         * @param queryInputs stores the required fields
         * @returns true if the verification successed
         */
        this.verifyOTP = (queryInputs) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlStr = `
            UPDATE otp
            SET has_verified = 1 
            WHERE created_at + interval 30 MINUTE >= now() AND email_address = '${queryInputs.email_address}' AND otp_code = ${queryInputs.otp_code} AND has_verified = 0 AND id <> 0;
            `;
                const result = yield this.dbConnect.promise().query(sqlStr);
                return result[0].changedRows >= 1;
            }
            catch (e) {
                console.log("error in saveOTPCode", e);
                throw e;
            }
        });
        /**
         * It adds the given user to the database after checking that the user used otp successfully
         * @param queryInputs stores the required fields
         * @returns the inserted user id.
         * @throws error when the user did not use the otp verification.
         */
        this.verifyAndAddTenant = (queryInputs) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkSqlStr = `
            UPDATE otp
            SET has_used = 1 
            WHERE has_verified = 1 AND email_address = '${queryInputs.email_address}' AND otp_type = 'REGISTRATION' AND id <> 0;
            `;
                const result = yield this.dbConnect.promise().query(checkSqlStr);
                if (result[0].changedRows === 0) {
                    throw new Error();
                }
                // adding user
                const hashedPassword = yield bcrypt_1.default.hash(queryInputs.password, 10);
                const sqlStr = `
                insert into user_main(first_name, last_name, email_address, gender, profile_image, id_iqama_number, settings_language, user_password, account_type, account_status)
                values('${queryInputs.first_name}', '${queryInputs.last_name}', '${queryInputs.email_address}', '${queryInputs.gender}', '${queryInputs.profile_image}', '${queryInputs.id_iqama_number}', '${queryInputs.language_iso}', '${hashedPassword}', 'TENANT', 1);
             `;
                const insertResult = yield this.dbConnect.promise().query(sqlStr);
                return insertResult.insertId;
            }
            catch (e) {
                console.log("error in addTenant", e);
                throw e;
            }
        });
        /**
         * It checks if the email has not been used
         * @param emailAddress stores the target email
         * @returns true if the email has not been used
         */
        this.verifyEmail = (emailAddress) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlStr = `select email_address from vaea.user_main WHERE email_address = '${emailAddress}'`;
                const result = yield this.dbConnect.promise().query(sqlStr);
                return result[0].length == 0;
            }
            catch (e) {
                throw e;
            }
        });
        /**
         * It retireves the user info
         * @param ueryInputs stores the required fields
         * @returns true if the email has not been used
         */
        this.loadUserInfo = (queryInputs) => __awaiter(this, void 0, void 0, function* () {
            try {
                // retrieves user info.
                const sqlStr = `
            SELECT id, first_name, last_name, email_address, profile_image, settings_language, user_password
            FROM vaea.user_main
            WHERE email_address = '${queryInputs.email_address}';
            `;
                const result = yield this.dbConnect.promise().query(sqlStr);
                // verifies password
                const isPasswordCorrect = bcrypt_1.default.compareSync(queryInputs.password, result[0][0].user_password);
                if (isPasswordCorrect) {
                    return userInfoOutputTenant_1.UserInfoOutputTenant.mapQueryResultToUserInfooutputTenant(result[0][0]);
                }
                else {
                    throw new Error();
                }
            }
            catch (e) {
                throw e;
            }
        });
        /**
         * It retrieves the list of available units.
         * @param ueryInputs stores the required fields
         * @returns the list of available units
         */
        this.searchUnit = (queryInputs) => __awaiter(this, void 0, void 0, function* () {
            try {
                // setup pagination values 
                const resultSize = 10;
                const offset = queryInputs.pager * resultSize;
                // setup the filters strings
                const unitTypeFilterStr = (queryInputs.unit_type != null) ? `AND u.unit_type = '${queryInputs.unit_type}' ` : '';
                const bathroomsFilterStr = (queryInputs.bathrooms != null) ? `AND u.bathrooms = ${queryInputs.bathrooms} ` : '';
                const bedRoomFilterStr = (queryInputs.bedrooms != null) ? `AND u.bedrooms = ${queryInputs.bedrooms} ` : '';
                const cityFilterStr = (queryInputs.city) ? `AND b.city = '${queryInputs.city}' ` : '';
                const districtFilterStr = (queryInputs.district) ? `AND b.district = '${queryInputs.district}' ` : '';
                const filtersStr = `${unitTypeFilterStr} ${bathroomsFilterStr} ${bedRoomFilterStr} ${cityFilterStr} ${districtFilterStr}`;
                // setup the sorting strings
                const sortByStr = (queryInputs.sorting < 2) ? 'u.price' : 'u.area';
                const sortOrder = (queryInputs.sorting == 0 || queryInputs.sorting == 3) ? 'asc' : 'desc';
                const sorting = `${sortByStr} ${sortOrder}`;
                // retrieves user info.
                const sqlStr = `
            SELECT u.id, u.unit_type, b.city, b.district, u.bedrooms, u.bathrooms, group_concat(DISTINCT i.image_url SEPARATOR ',') as urls, u.listing_title, u.price 
            FROM vaea.unit u
            INNER JOIN vaea.building b ON b.id = u.building_id ${filtersStr}
            INNER JOIN vaea.unit_image i ON i.unit_id = u.id
            GROUP BY u.id
            ORDER BY ${sorting}  
            LIMIT ${offset},${resultSize}
            `;
                const result = yield this.dbConnect.promise().query(sqlStr);
                const output = result[0].map((unit) => searchUnitsOutputTenant_1.SearchUnitsOutputTenant.mapQueryResultToSearchUnitsOutputTenant(unit));
                return output;
            }
            catch (e) {
                console.log("inn", e);
                throw e;
            }
        });
        /**
         * It retrieves the details of the given unit id.
         * @param unit_id stores the target unit id
         * @returns the details of the found unit
         */
        this.loadUnitDetails = (emailAddress) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlStr = `
            SELECT u.id as unit_id, b.id as building_id, u.unit_type, b.city, b.district, b.street, b.lat, b.lon, u.bedrooms, u.bathrooms, u.area, u.floor, group_concat(DISTINCT i.image_url SEPARATOR ',') as urls, u.listing_title, u.price 
            FROM vaea.unit u
            INNER JOIN vaea.building b ON b.id = u.building_id  AND u.id = ${emailAddress}
            INNER JOIN vaea.unit_image i ON i.unit_id = u.id
            GROUP BY u.id;
            `;
                const result = yield this.dbConnect.promise().query(sqlStr);
                if (result[0].length == 0) {
                    throw new Error();
                }
                return unitDetailsOutput_tenant_1.UnitDetailsOutputTenant.mapQueryResultToUnitDetailsOutputTenant(result[0][0]);
            }
            catch (e) {
                throw e;
            }
        });
        this.dbConnect = dbConnectionManager_1.DbConnectionManager.connection;
    }
}
exports.TenantDAO = TenantDAO;
