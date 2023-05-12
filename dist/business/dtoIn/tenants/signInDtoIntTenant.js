"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInDtoInTenant = void 0;
/**
 * It represents the required fields of tenantService.signIn
 */
class SignInDtoInTenant {
    constructor(email_address, password) {
        this.email_address = email_address;
        this.password = password;
    }
    static mapSignInRequestTenantToSignInDtoInTenant(requestField) {
        return new SignInDtoInTenant(requestField.email_address, requestField.password);
    }
}
exports.SignInDtoInTenant = SignInDtoInTenant;
