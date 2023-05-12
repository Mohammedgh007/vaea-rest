"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDtoInTenant = void 0;
/**
 * It represents the required fields of tenantService.register
 */
class RegisterDtoInTenant {
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
    static mapRegisterRequestTenantToRegisterDtoInTenant(registerRequestTenant) {
        return new RegisterDtoInTenant(registerRequestTenant.first_name, registerRequestTenant.last_name, registerRequestTenant.gender, registerRequestTenant.profile_image, registerRequestTenant.id_iqama_number, registerRequestTenant.email_address, registerRequestTenant.password, registerRequestTenant.language_iso);
    }
}
exports.RegisterDtoInTenant = RegisterDtoInTenant;
