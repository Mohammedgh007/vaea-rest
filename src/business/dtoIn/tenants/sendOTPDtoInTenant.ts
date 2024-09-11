import { SendOTPRequestTenant } from "../../../presentation/requests/tenants/sendOTPRequestTenant"

/**
 * It is the input of the service tenant.sendOTP
 */
export class SendOTPDtoInTenant {
    email_address: string
    request_type: string // It must be either REGISTRATION or TERMINATION or RESET_PASSWORD
    language_iso: string // It must be either en or ar 

    constructor(email_address: string, request_type: string, language_iso: string ) {
        this.email_address = email_address
        this.request_type = request_type
        this.language_iso = language_iso
    }    

    static mapSendOTPRequestTenantToSendOTPDtoIn(sendOTPRequest: SendOTPRequestTenant): SendOTPDtoInTenant {
        return new SendOTPDtoInTenant(sendOTPRequest.email_address, sendOTPRequest.request_type, 
            sendOTPRequest.language_iso)
    }
}