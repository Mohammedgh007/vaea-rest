"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOTPRequestTenant = void 0;
/**
 * It represents the body fields of Tenant.sendOTP
 */
class SendOTPRequestTenant {
    constructor(email_address, request_type, language_iso) {
        this.email_address = email_address;
        this.request_type = request_type;
        this.language_iso = language_iso;
    }
    static mapJsonToSendOTPRequestTenant(bodyFields) {
        return new SendOTPRequestTenant(bodyFields.email_address, bodyFields.request_type, bodyFields.language_iso);
    }
}
exports.SendOTPRequestTenant = SendOTPRequestTenant;
