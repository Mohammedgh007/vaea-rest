import { RegisterRequestTenant } from "../../../presentation/requests/tenants/registerRequestTenant"

/**
 * It represents the required fields of tenantService.register
 */
export class RegisterDtoInTenant {

    first_name: string
    last_name: string
    gender: string // either FEMALE or MALE 
    profile_image: any// optioal type File
    id_iqama_number: string
    email_address: string
    password: string
    language_iso: string

    constructor(
        first_name: string,
        last_name: string,
        gender: string, // either FEMALE or MALE, 
        profile_image: any,
        id_iqama_number: string,
        email_address: string,
        password: string,
        language_iso: string
    ) {
        this.first_name = first_name
        this.last_name = last_name
        this.gender = gender
        this.profile_image = profile_image
        this.id_iqama_number = id_iqama_number
        this.email_address = email_address
        this.password = password
        this.language_iso = language_iso
    } 

    static mapRegisterRequestTenantToRegisterDtoInTenant(registerRequestTenant: RegisterRequestTenant): RegisterDtoInTenant {
        return new RegisterDtoInTenant(registerRequestTenant.first_name, 
            registerRequestTenant.last_name, 
            registerRequestTenant.gender,
            registerRequestTenant.profile_image,
            registerRequestTenant.id_iqama_number,
            registerRequestTenant.email_address,
            registerRequestTenant.password,
            registerRequestTenant.language_iso)
    }
}