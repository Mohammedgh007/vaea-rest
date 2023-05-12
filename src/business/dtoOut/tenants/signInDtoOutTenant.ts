import { UserInfoOutputTenant } from "../../../dataAccess/outputs/tenants/userInfoOutputTenant"

/**
 * It represnts the output fields of tenantSerivce.signIn
 */
export class SignInDtoOutTenant {

    user_id: number
    first_name: string
    last_name: string
    profile_image: string = ""// keeps it "" if none
    email_address: string
    language_iso: string

    constructor(
        user_id: number,
        first_name: string,
        last_name: string,
        profile_image: string,
        email_address: string,
        language_iso: string
    ) {
        this.user_id = user_id
        this.first_name = first_name
        this.last_name = last_name
        this.profile_image = profile_image
        this.email_address = email_address
        this.language_iso = language_iso
    } 

    static mapUserInfoOutputTenantToSignInDtoOutTenant = (output: UserInfoOutputTenant): SignInDtoOutTenant => {
        return new SignInDtoOutTenant(
            output.user_id,
            output.first_name,
            output.last_name,
            output.profile_image,
            output.email_address,
            output.language_iso
        )
    }

}