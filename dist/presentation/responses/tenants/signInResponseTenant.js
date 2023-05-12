"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInResponseTenant = void 0;
// It representds the fields in data within the response of Tenant.signIn
class SignInResponseTenant {
    constructor(auth_token, first_name, last_name, profile_image, user_lang // stores iso code for the language preference
    ) {
        this.auth_token = auth_token;
        this.first_name = first_name;
        this.last_name = last_name;
        this.profile_image = profile_image;
        this.user_lang = user_lang;
    }
}
SignInResponseTenant.mapSignInDtoOutTenantToSignInResponseTenant = (output, authToken) => {
    return new SignInResponseTenant(authToken, output.first_name, output.last_name, output.profile_image, output.language_iso);
};
exports.SignInResponseTenant = SignInResponseTenant;
