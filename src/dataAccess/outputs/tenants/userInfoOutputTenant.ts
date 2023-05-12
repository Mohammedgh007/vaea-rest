
/**
 * It represents the output fields of tenantDAO.loadUserInfo
 */
export class UserInfoOutputTenant {

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

    static mapQueryResultToUserInfooutputTenant = (result: any): UserInfoOutputTenant => {
        return new UserInfoOutputTenant(
            result.id,
            result.first_name,
            result.last_name,
            result.profile_image,
            result.email_address,
            result.settings_language
        )
    }

}