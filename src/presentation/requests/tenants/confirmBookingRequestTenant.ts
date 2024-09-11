

/**
 * This class represents the fields for tenantRouter.confirmBooking
 */
export class ConfirmBookingRequestTenant {

    unit_id: string 
    // must be either MOYASAR
    payment_provider: string
    payment_id: string
    // must be either '3 MONTHS', '6 MONTHS', or '12 MONTHS'
    lease_period_type: string 
    // It must be on format '2023-05-24T18:28:46Z'
    starting_date: Date 
    ending_date: Date

    constructor(
        unit_id: string,
        payment_provider: string,
        payment_id: string,
        lease_period_type: string,
        starting_date: Date,
        ending_date: Date,
    ) {
        this.unit_id = unit_id 
        this.payment_provider = payment_provider
        this.payment_id = payment_id
        this.lease_period_type = lease_period_type
        this.starting_date = starting_date
        this.ending_date = ending_date
    }


    static mapJsonToConfirmBookingRequestTenant(req: any): ConfirmBookingRequestTenant {
        return new ConfirmBookingRequestTenant(
            req.body.unit_id,
            req.body.payment_provider,
            req.body.payment_id,
            req.body.lease_period_type,
            new Date(req.body.starting_date),
            new Date(req.body.ending_date)
        )
        
    }
}