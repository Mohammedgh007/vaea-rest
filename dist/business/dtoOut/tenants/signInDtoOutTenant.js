"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInDtoOutTenant = void 0;
/**
 * It represnts the output fields of tenantSerivce.signIn
 */
class SignInDtoOutTenant {
    constructor(user_id, first_name, last_name, profile_image, email_address, language_iso) {
        this.profile_image = ""; // keeps it "" if none
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.profile_image = profile_image;
        this.email_address = email_address;
        this.language_iso = language_iso;
    }
}
SignInDtoOutTenant.mapUserInfoOutputTenantToSignInDtoOutTenant = (output) => {
    return new SignInDtoOutTenant(output.user_id, output.first_name, output.last_name, output.profile_image, output.email_address, output.language_iso);
};
exports.SignInDtoOutTenant = SignInDtoOutTenant;
