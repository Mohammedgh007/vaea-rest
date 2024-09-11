import { ConfirmBookingRequestTenant } from "../../../presentation/requests/tenants/confirmBookingRequestTenant"

/**
 * This class represents the fields for tenantService.confirmBooking
 */
export class ConfirmBookingDtoInTenant {

    unit_id: string 
    // must be either MOYASAR
    payment_provider: string
    payment_id: string
    // must be either '3 MONTHS', '6 MONTHS', or '12 MONTHS'
    lease_period_type: string 
    starting_date: Date 
    ending_date: Date
    user_id: string

    constructor(
        unit_id: string,
        payment_provider: string,
        payment_id: string,
        lease_period_type: string,
        starting_date: Date,
        ending_date: Date,
        user_id: string
    ) {
        this.unit_id = unit_id 
        this.payment_provider = payment_provider
        this.payment_id = payment_id
        this.lease_period_type = lease_period_type
        this.starting_date = starting_date
        this.ending_date = ending_date
        this.user_id = user_id
    }


    static mapConfirmBookingRequestTenantToConfirmBookingDtoInTenant(requestFields: ConfirmBookingRequestTenant, user_id: string): ConfirmBookingDtoInTenant {
        return new ConfirmBookingDtoInTenant(
            requestFields.unit_id,
            requestFields.payment_provider,
            requestFields.payment_id,
            requestFields.lease_period_type,
            requestFields.starting_date,
            requestFields.ending_date,
            user_id
        )
    }
}