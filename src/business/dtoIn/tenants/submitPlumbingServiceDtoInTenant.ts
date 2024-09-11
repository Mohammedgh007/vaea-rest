import { SubmitPlumbingServiceRequestTenant } from "../../../presentation/requests/tenants/submitPlumbingServiceRequestTenant"

/**
 * It represents the required fields of tenantService.submitPlumbing
 */
export class SubmitPlumbingServiceDtoInTenant {

    prefered_date: Date 
    notes: string // optional
    room: string // must be either KITCHEN, BATHROOM, OTHER 
    category: string // must be either KITCHEN_SINK, KITCHEN_WASHER, KITCHEN_OTHER, BATHROOM_SINK, BATHROOM_TOILET, BATHROOM_SHOWER, BATHROOM_OTHER, OTHER_OTHER
    describtion: string
    user_id: string

    constructor(
        prefered_date: Date,
        notes: string,
        room: string,
        category: string,
        describtion: string,
        user_id: string
    ) {
        this.prefered_date = prefered_date
        this.notes = notes
        this.room = room
        this.category = category
        this.describtion = describtion
        this.user_id = user_id
    }

    static mapSubmitPlumbingServiceRequestTenantToSubmitPlumbingServiceDtoInTenant(requestField: SubmitPlumbingServiceRequestTenant, user_id: string): SubmitPlumbingServiceDtoInTenant {
        return new SubmitPlumbingServiceDtoInTenant(
            requestField.prefered_date,
            requestField.notes,
            requestField.room,
            requestField.category,
            requestField.describtion,
            user_id
            )
    }
}