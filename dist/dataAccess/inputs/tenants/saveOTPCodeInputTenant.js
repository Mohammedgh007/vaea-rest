"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveOTPCodeInputTenant = void 0;
/**
 * It stores the fields of tenantDAO.saveOTPCode
 */
class SaveOTPCodeInputTenant {
    constructor(email_address, request_type) {
        this.email_address = email_address;
        this.request_type = request_type;
    }
    static mapSendOTPDtoInTenantToSaveOTPCodeInputTenant(sendOTPRequest) {
        return new SaveOTPCodeInputTenant(sendOTPRequest.email_address, sendOTPRequest.request_type);
    }
}
exports.SaveOTPCodeInputTenant = SaveOTPCodeInputTenant;
