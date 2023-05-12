"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInRequestTenant = void 0;
/**
 * This class represents the fields for tenantRouter.signIn
 */
class SignInRequestTenant {
    constructor(email_address, password) {
        this.email_address = email_address;
        this.password = password;
    }
    static mapJsonToSignInRequestTenant(req) {
        return new SignInRequestTenant(req.body.email_address, req.body.password);
    }
}
exports.SignInRequestTenant = SignInRequestTenant;
