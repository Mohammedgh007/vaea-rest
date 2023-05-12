import { SignInRequestTenant } from "../../../presentation/requests/tenants/signInRequestTenant"

/**
 * It represents the required fields of tenantService.signIn
 */
export class SignInDtoInTenant {

    email_address: string
    password: string

    constructor( email_address: string, password: string ) {
        this.email_address = email_address
        this.password = password
    } 

    static mapSignInRequestTenantToSignInDtoInTenant(requestField: SignInRequestTenant): SignInDtoInTenant {
        return new SignInDtoInTenant(
            requestField.email_address,
            requestField.password)
    }
}