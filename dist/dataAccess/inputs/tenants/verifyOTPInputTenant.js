"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOTPInputTenant = void 0;
/**
 * It stores the inputs of tenantDAO.verifyOTP
 */
class VerifyOTPInputTenant {
    constructor(email_address, otp_code) {
        this.email_address = email_address;
        this.otp_code = otp_code;
    }
    static mapVerifyOTPDtoInTenantToVerifyOTPInputTenant(bodyFields) {
        return new VerifyOTPInputTenant(bodyFields.email_address, bodyFields.otp_code);
    }
}
exports.VerifyOTPInputTenant = VerifyOTPInputTenant;
