/**
 * This class represents the fields for tenantRouter.register
 */
export class RegisterRequestTenant {

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

    static mapJsonToRegisterRequestTenant(req: any): RegisterRequestTenant {
        
        return new RegisterRequestTenant(req.body.first_name, 
            req.body.last_name, 
            req.body.gender,
            (req.file === undefined) ? null : req.file,
            req.body.id_iqama_number,
            req.body.email_address,
            req.body.password,
            req.body.language_iso)
    }


}