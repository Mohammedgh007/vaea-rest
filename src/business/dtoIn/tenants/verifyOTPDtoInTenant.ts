import { VerifyOTPRequestTenant } from "../../../presentation/requests/tenants/verifyOTPRequestTenant";

/**
 * It stores the input of the service tenant.verifyOTP
 */
export class VerifyOTPDtoInTenant {

    email_address: string
    otp_code: string


    constructor(email_address: string, otp_code: string) {
        this.email_address = email_address
        this.otp_code = otp_code
    } 

    static mapVerifyOTPRequestTenantToVerifyOTPDtoInTenant(verifyOTPRequestTenant: VerifyOTPRequestTenant): VerifyOTPDtoInTenant {
        return new VerifyOTPDtoInTenant(verifyOTPRequestTenant.email_address, verifyOTPRequestTenant.otp_code);
    }
}
