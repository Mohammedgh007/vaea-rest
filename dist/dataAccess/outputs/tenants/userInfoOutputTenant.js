"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoOutputTenant = void 0;
/**
 * It represents the output fields of tenantDAO.loadUserInfo
 */
class UserInfoOutputTenant {
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
UserInfoOutputTenant.mapQueryResultToUserInfooutputTenant = (result) => {
    return new UserInfoOutputTenant(result.id, result.first_name, result.last_name, result.profile_image, result.email_address, result.settings_language);
};
exports.UserInfoOutputTenant = UserInfoOutputTenant;
