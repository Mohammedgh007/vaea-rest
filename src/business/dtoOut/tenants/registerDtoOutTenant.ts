/**
 * It represents the output fields of tenantService.register 
 */
export class RegisterDtoOutTenant {

    profileImageUrl: any // It could be null or string
    userId: number

    constructor(profileImageUrl: any, userId: number) {
    this.profileImageUrl = profileImageUrl
    this.userId = userId
  } 
}