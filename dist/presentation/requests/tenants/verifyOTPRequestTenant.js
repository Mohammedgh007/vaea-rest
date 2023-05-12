"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOTPRequestTenant = void 0;
/**
 * It includes the required fields for the request tenantRouter.verifyOTP
 */
class VerifyOTPRequestTenant {
    constructor(email_address, otp_code) {
        this.email_address = email_address;
        this.otp_code = otp_code;
    }
    static mapJsonToVerifyOTPRequestTenant(bodyFields) {
        return new VerifyOTPRequestTenant(bodyFields.email_address, bodyFields.otp_code);
    }
}
exports.VerifyOTPRequestTenant = VerifyOTPRequestTenant;
