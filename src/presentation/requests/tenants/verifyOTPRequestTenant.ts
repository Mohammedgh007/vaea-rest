/**
 * It includes the required fields for the request tenantRouter.verifyOTP
 */
export class VerifyOTPRequestTenant {

    email_address: string
    otp_code: string


    constructor(email_address: string, otp_code: string) {
        this.email_address = email_address
        this.otp_code = otp_code
    } 

    static mapJsonToVerifyOTPRequestTenant(bodyFields: any): VerifyOTPRequestTenant {
        return new VerifyOTPRequestTenant(bodyFields.email_address, bodyFields.otp_code);
    }


}