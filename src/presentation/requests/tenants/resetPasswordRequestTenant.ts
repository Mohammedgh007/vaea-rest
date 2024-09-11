

/**
 * This class represents the fields for tenantRouter.resetPassword
 */
export class ResetPasswordRequestTenant {

    email_address: string
    old_password: string
    new_password: string

    constructor( email_address: string, old_password: string, new_password: string ) {
        this.email_address = email_address
        this.old_password = old_password
        this.new_password = new_password
    } 

    static mapJsonToResetPasswordRequestTenant(req: any): ResetPasswordRequestTenant {
        return new ResetPasswordRequestTenant(
            req.body.email_address,
            req.body.old_password,
            req.body.new_password)
    }
}