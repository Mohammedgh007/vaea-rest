"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterResponseTenant = void 0;
/**
 * It represents the output data for tenantRouter.register
 */
class RegisterResponseTenant {
    constructor(profile_image_url, auth_token) {
        this.profile_image_url = profile_image_url;
        this.auth_token = auth_token;
    }
}
exports.RegisterResponseTenant = RegisterResponseTenant;
