"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRequestTenant = void 0;
/**
 * This class represents the fields for tenantRouter.register
 */
class RegisterRequestTenant {
    constructor(first_name, last_name, gender, // either FEMALE or MALE, 
    profile_image, id_iqama_number, email_address, password, language_iso) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.profile_image = profile_image;
        this.id_iqama_number = id_iqama_number;
        this.email_address = email_address;
        this.password = password;
        this.language_iso = language_iso;
    }
    static mapJsonToRegisterRequestTenant(req) {
        return new RegisterRequestTenant(req.body.first_name, req.body.last_name, req.body.gender, (req.file === undefined) ? null : req.file, req.body.id_iqama_number, req.body.email_address, req.body.password, req.body.language_iso);
    }
}
exports.RegisterRequestTenant = RegisterRequestTenant;
