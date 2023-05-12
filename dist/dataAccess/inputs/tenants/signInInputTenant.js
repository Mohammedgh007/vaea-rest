"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInInputTenant = void 0;
/**
 * It represents the required fields of tenantDAO.signIn
 */
class SignInInputTenant {
    constructor(email_address, password) {
        this.email_address = email_address;
        this.password = password;
    }
    static mapSignInDtoInTenantToSignInInputTenant(serviceFields) {
        return new SignInInputTenant(serviceFields.email_address, serviceFields.password);
    }
}
exports.SignInInputTenant = SignInInputTenant;
