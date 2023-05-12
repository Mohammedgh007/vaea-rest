/**
 * It stores the inputs of tenantDAO.verifyOTP
 */
export class VerifyOTPInputTenant {

    email_address: string
    otp_code: string


    constructor(email_address: string, otp_code: string) {
        this.email_address = email_address
        this.otp_code = otp_code
    } 

    static mapVerifyOTPDtoInTenantToVerifyOTPInputTenant(bodyFields: any): VerifyOTPInputTenant {
        return new VerifyOTPInputTenant(bodyFields.email_address, bodyFields.otp_code);
    }

}