"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOTPDtoInTenant = void 0;
/**
 * It is the input of the service tenant.sendOTP
 */
class SendOTPDtoInTenant {
    constructor(email_address, request_type, language_iso) {
        this.email_address = email_address;
        this.request_type = request_type;
        this.language_iso = language_iso;
    }
    static mapSendOTPRequestTenantToSendOTPDtoIn(sendOTPRequest) {
        return new SendOTPDtoInTenant(sendOTPRequest.email_address, sendOTPRequest.request_type, sendOTPRequest.language_iso);
    }
}
exports.SendOTPDtoInTenant = SendOTPDtoInTenant;
