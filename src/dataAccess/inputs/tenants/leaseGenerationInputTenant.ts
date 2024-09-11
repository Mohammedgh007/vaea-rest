import { ConfirmBookingDtoInTenant } from "../../../business/dtoIn/tenants/confirmBookingDtoInTenant"

/**
 * It stores the fields of tenantDAO.saveOTPCode
 */
export class LeaseGenerationInputTenant {

    unit_id: string 
    // must be either MOYASAR
    payment_provider: string
    // must be either '3 MONTHS', '6 MONTHS', or '12 MONTHS'
    lease_period_type: string 
    starting_date: Date 
    ending_date: Date
    user_id: string

    constructor(
        unit_id: string,
        payment_provider: string,
        lease_period_type: string,
        starting_date: Date,
        ending_date: Date,
        user_id: string
    ) {
        this.unit_id = unit_id 
        this.payment_provider = payment_provider
        this.lease_period_type = lease_period_type
        this.starting_date = starting_date
        this.ending_date = ending_date
        this.user_id = user_id
    }   

    static mapConfirmBookingDtoInTenant(serviceFields: ConfirmBookingDtoInTenant): LeaseGenerationInputTenant {
        return new LeaseGenerationInputTenant(
            serviceFields.unit_id,
            serviceFields.payment_provider,
            serviceFields.lease_period_type,
            serviceFields.starting_date,
            serviceFields.ending_date,
            serviceFields.user_id
        )
    }

}