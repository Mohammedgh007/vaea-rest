"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * It stores the required fields for tenantDAO.addTenant
 */
class VerifyAndAddInputTenant {
    constructor(first_name, last_name, gender, // either FEMALE or MALE, 
    id_iqama_number, email_address, password, language_iso) {
        this.profile_image = ""; // keeps it "" if none
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.id_iqama_number = id_iqama_number;
        this.email_address = email_address;
        this.password = password;
        this.language_iso = language_iso;
    }
    static mapRegisterDtoInTenant(registerDtoInTenant) {
        return new VerifyAndAddInputTenant(registerDtoInTenant.first_name, registerDtoInTenant.last_name, registerDtoInTenant.gender, registerDtoInTenant.id_iqama_number, registerDtoInTenant.email_address, registerDtoInTenant.password, registerDtoInTenant.language_iso);
    }
}
exports.default = VerifyAndAddInputTenant;
