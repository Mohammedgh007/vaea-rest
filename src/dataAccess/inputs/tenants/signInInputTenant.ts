import { SignInDtoInTenant } from "../../../business/dtoIn/tenants/signInDtoIntTenant"

/**
 * It represents the required fields of tenantDAO.signIn
 */
export class SignInInputTenant {

    email_address: string
    password: string

    constructor( email_address: string, password: string ) {
        this.email_address = email_address
        this.password = password
    } 

    static mapSignInDtoInTenantToSignInInputTenant(serviceFields: SignInDtoInTenant): SignInInputTenant {
        return new SignInInputTenant(
            serviceFields.email_address,
            serviceFields.password)
    }
}