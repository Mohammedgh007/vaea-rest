import { ResetPasswordDtoInTenant } from "../../../business/dtoIn/tenants/resetPasswordDtoInTenant"

/**
 * It represents the required fields of tenantDAO.resetPassword
 */
export class ResetPasswordInputTenant {

    email_address: string
    old_password: string
    new_password: string

    constructor( email_address: string, old_password: string, new_password: string ) {
        this.email_address = email_address
        this.old_password = old_password
        this.new_password = new_password
    } 

    static mapresetPasswordDtoInTenantToSignInInputTenant(serviceFields: ResetPasswordDtoInTenant): ResetPasswordInputTenant {
        return new ResetPasswordInputTenant(
            serviceFields.email_address,
            serviceFields.old_password,
            serviceFields.new_password)
    }
}