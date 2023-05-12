"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDtoOutTenant = void 0;
/**
 * It represents the output fields of tenantService.register
 */
class RegisterDtoOutTenant {
    constructor(profileImageUrl, userId) {
        this.profileImageUrl = profileImageUrl;
        this.userId = userId;
    }
}
exports.RegisterDtoOutTenant = RegisterDtoOutTenant;
