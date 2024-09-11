

/**
 * This class represents the fields for tenantRouter.submitPlumbing
 */
export class SubmitElectracianServiceRequestTenant {

    prefered_date: Date 
    notes: string // optional
    room: string // must be either KITCHEN, BATHROOM, BEDROOM, LIVINGROOM, OTHER 
    category: string // must be either OUTLET, LAMP, FAN_SUCTION, OTHER
    describtion: string

    constructor(
        prefered_date: Date,
        notes: string,
        room: string,
        category: string,
        describtion: string
    ) {
        this.prefered_date = prefered_date
        this.notes = notes
        this.room = room
        this.category = category
        this.describtion = describtion
    }


    static mapJsonToSubmitElectracianServiceRequestTenant(req: any): SubmitElectracianServiceRequestTenant {
        return new SubmitElectracianServiceRequestTenant(
            new Date(req.body.prefered_date),
            req.body.notes,
            req.body.room,
            req.body.category,
            req.body.describtion
        )
        
    }
}