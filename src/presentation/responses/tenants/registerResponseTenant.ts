/**
 * It represents the output data for tenantRouter.register
 */
export class RegisterResponseTenant {

    profile_image_url: any // it could be null or stinng
    auth_token: string

    constructor(profile_image_url: any, auth_token: string) {
        this.profile_image_url = profile_image_url
        this.auth_token = auth_token
  }    
}