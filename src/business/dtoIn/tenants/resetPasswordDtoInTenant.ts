import { ResetPasswordRequestTenant } from "../../../presentation/requests/tenants/resetPasswordRequestTenant"


/**
 * It represents the required fields of tenantService.resetPassword
 */
export class ResetPasswordDtoInTenant {

    email_address: string
    old_password: string
    new_password: string

    constructor( email_address: string, old_password: string, new_password: string ) {
        this.email_address = email_address
        this.old_password = old_password
        this.new_password = new_password
    } 

    static mapResetPasswordRequestTenantToResetPasswordDtoInTenant(requestField: ResetPasswordRequestTenant): ResetPasswordDtoInTenant {
        return new ResetPasswordDtoInTenant(
            requestField.email_address,
            requestField.old_password,
            requestField.new_password
            )
    }
}