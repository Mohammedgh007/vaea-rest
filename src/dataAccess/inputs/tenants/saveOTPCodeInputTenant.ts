import { SendOTPDtoInTenant } from "../../../business/dtoIn/tenants/sendOTPDtoInTenant"

/**
 * It stores the fields of tenantDAO.saveOTPCode
 */
export class SaveOTPCodeInputTenant {

    email_address: string
    request_type: string // It must be either REGISTRATION or TERMINATION

    constructor(email_address: string, request_type: string) {
        this.email_address = email_address
        this.request_type = request_type
    }    

    static mapSendOTPDtoInTenantToSaveOTPCodeInputTenant(sendOTPRequest: SendOTPDtoInTenant): SaveOTPCodeInputTenant {
        return new SaveOTPCodeInputTenant(sendOTPRequest.email_address, sendOTPRequest.request_type)
    }

}