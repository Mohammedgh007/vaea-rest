"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOTPDtoInTenant = void 0;
/**
 * It stores the input of the service tenant.verifyOTP
 */
class VerifyOTPDtoInTenant {
    constructor(email_address, otp_code) {
        this.email_address = email_address;
        this.otp_code = otp_code;
    }
    static mapVerifyOTPRequestTenantToVerifyOTPDtoInTenant(verifyOTPRequestTenant) {
        return new VerifyOTPDtoInTenant(verifyOTPRequestTenant.email_address, verifyOTPRequestTenant.otp_code);
    }
}
exports.VerifyOTPDtoInTenant = VerifyOTPDtoInTenant;
