/**
 * It represents the body fields of Tenant.sendOTP
 */
export class SendOTPRequestTenant {

    email_address: string
    request_type: string // It must be either REGISTRATION or TERMINATION
    language_iso: string // It must be either en or ar 

    constructor(email_address: string, request_type: string, language_iso: string ) {
        this.email_address = email_address
        this.request_type = request_type
        this.language_iso = language_iso
    }    

    static mapJsonToSendOTPRequestTenant(bodyFields: any): SendOTPRequestTenant {
        return new SendOTPRequestTenant(bodyFields.email_address, bodyFields.request_type, 
            bodyFields.language_iso)
    }
}