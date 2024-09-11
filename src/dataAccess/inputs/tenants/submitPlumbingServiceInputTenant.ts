import { SubmitPlumbingServiceDtoInTenant } from "../../../business/dtoIn/tenants/submitPlumbingServiceDtoInTenant"


/**
 * It stores the fields of tenantDAO.submitPlumbing
 */
export class SubmitPlumbingServiceInputTenant {

    prefered_date: Date 
    notes: string // optional
    room: string // must be either KITCHEN, BATHROOM, OTHER 
    category: string // must be either KITCHEN_SINK, KITCHEN_WASHER, KITCHEN_OTHER, BATHROOM_SINK, BATHROOM_TOILET, BATHROOM_SHOWER, BATHROOM_OTHER, OTHER_OTHER
    describtion: string
    user_id: string
    lease_id: number

    constructor(
        prefered_date: Date,
        notes: string,
        room: string,
        category: string,
        describtion: string,
        user_id: string,
        lease_id: number
    ) {
        this.prefered_date = prefered_date
        this.notes = notes
        this.room = room
        this.category = category
        this.describtion = describtion
        this.user_id = user_id,
        this.lease_id = lease_id
    }  

    static mapSubmitPlumbingServiceDtoInTenantToSubmitPlumbingServiceInputTenant(serviceFields: SubmitPlumbingServiceDtoInTenant, lease_id: number): SubmitPlumbingServiceInputTenant {
        return new SubmitPlumbingServiceInputTenant(
            serviceFields.prefered_date,
            serviceFields.notes,
            serviceFields.room,
            serviceFields.category,
            serviceFields.describtion,
            serviceFields.user_id,
            lease_id
            )
    }

}