import { SubmitElectrcianServiceDtoInTenant } from "../../../business/dtoIn/tenants/submitElectricianServiceDtoInTenant"
import { SubmitPlumbingServiceDtoInTenant } from "../../../business/dtoIn/tenants/submitPlumbingServiceDtoInTenant"


/**
 * It stores the fields of tenantDAO.submitElectrcian
 */
export class SubmitElectricianServiceInputTenant {

    prefered_date: Date 
    notes: string // optional
    room: string // must be either KITCHEN, BATHROOM, BEDROOM, LIVINGROOM, OTHER 
    category: string // must be either KITCHEN_OUTLET, KITCHEN_OTHER, BATHROOM_OUTLET, BATHROOM_OTHER, BEDROOM_OUTLET, BEDROOM_OTHER, LIVINGROOM_OUTLET, LIVINGROOM_OTHER, OTHER_OUTLET
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
        this.user_id = user_id
        this.lease_id = lease_id
    } 

    static mapSubmitElectrcianServiceDtoInTenantToSubmitElectricianServiceInputTenant(serviceFields: SubmitElectrcianServiceDtoInTenant, lease_id: number): SubmitElectricianServiceInputTenant {
        return new SubmitElectricianServiceInputTenant(
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