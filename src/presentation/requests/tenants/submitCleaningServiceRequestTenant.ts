

/**
 * This class represents the fields for tenantRouter.submitCleanHouse
 */
export class SubmitCleaningServiceRequestTenant {

    prefered_date: Date 
    notes: string // optional
    user_id: string

    constructor(
        prefered_date: Date,
        notes: string,
        user_id: string
    ) {
        this.prefered_date = prefered_date
        this.notes = notes
        this.user_id = user_id
    }


    static mapJsonToSubmitCleaningServiceRequestTenant(req: any): SubmitCleaningServiceRequestTenant {
        return new SubmitCleaningServiceRequestTenant(
            new Date(req.body.prefered_date),
            req.body.notes,
            req.body.user_id
        )
        
    }
}