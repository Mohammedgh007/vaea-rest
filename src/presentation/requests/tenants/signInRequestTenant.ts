
/**
 * This class represents the fields for tenantRouter.signIn
 */
export class SignInRequestTenant {

    email_address: string
    password: string

    constructor( email_address: string, password: string ) {
        this.email_address = email_address
        this.password = password
    } 

    static mapJsonToSignInRequestTenant(req: any): SignInRequestTenant {
        return new SignInRequestTenant(
            req.body.email_address,
            req.body.password)
    }
}