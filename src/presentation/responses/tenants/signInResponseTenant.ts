import { SignInDtoOutTenant } from "../../../business/dtoOut/tenants/signInDtoOutTenant"

// It representds the fields in data within the response of Tenant.signIn
export class SignInResponseTenant {

    auth_token: string
    first_name: string
    last_name: string
    profile_image: string
    user_lang: string // stores iso code for the language preference

    
    constructor(
        auth_token: string,
        first_name: string,
        last_name: string,
        profile_image: string,
        user_lang: string // stores iso code for the language preference
    ) {
        this.auth_token = auth_token
        this.first_name = first_name
        this.last_name = last_name
        this.profile_image = profile_image
        this.user_lang = user_lang
    } 


    static mapSignInDtoOutTenantToSignInResponseTenant = (output: SignInDtoOutTenant, authToken: string): SignInResponseTenant => {
        return new SignInResponseTenant(
            authToken,
            output.first_name,
            output.last_name,
            output.profile_image,
            output.language_iso
        )
    }



}