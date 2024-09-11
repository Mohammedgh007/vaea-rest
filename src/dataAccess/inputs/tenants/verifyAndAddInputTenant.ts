import { RegisterDtoInTenant } from "../../../business/dtoIn/tenants/registerDtoInTenant"

/**
 * It stores the required fields for tenantDAO.addTenant
 */
export default class VerifyAndAddInputTenant {

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
        id_iqama_number: string,
        email_address: string,
        password: string,
        language_iso: string
    ) {
        this.first_name = first_name
        this.last_name = last_name
        this.gender = gender
        this.profile_image = null
        this.id_iqama_number = id_iqama_number
        this.email_address = email_address
        this.password = password
        this.language_iso = language_iso
    } 

    static mapRegisterDtoInTenant(registerDtoInTenant: RegisterDtoInTenant): VerifyAndAddInputTenant {
        return new VerifyAndAddInputTenant(registerDtoInTenant.first_name, 
            registerDtoInTenant.last_name, 
            registerDtoInTenant.gender,
            registerDtoInTenant.id_iqama_number,
            registerDtoInTenant.email_address,
            registerDtoInTenant.password,
            registerDtoInTenant.language_iso)
    }

}