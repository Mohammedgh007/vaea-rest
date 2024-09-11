import { RegisterRequestTenant } from "../../../presentation/requests/tenants/registerRequestTenant"
import { SubmitCleaningServiceRequestTenant } from "../../../presentation/requests/tenants/submitCleaningServiceRequestTenant"
import { SubmitElectracianServiceRequestTenant } from "../../../presentation/requests/tenants/submitElectricianServiceRequestTenant"

/**
 * It represents the required fields of tenantService.submitElectrician
 */
export class SubmitElectrcianServiceDtoInTenant {

    prefered_date: Date 
    notes: string // optional
    room: string // must be either KITCHEN, BATHROOM, BEDROOM, LIVINGROOM, OTHER 
    category: string // must be either KITCHEN_OUTLET, KITCHEN_OTHER, BATHROOM_OUTLET, BATHROOM_OTHER, BEDROOM_OUTLET, BEDROOM_OTHER, LIVINGROOM_OUTLET, LIVINGROOM_OTHER, OTHER_OUTLET
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
     

    static mapSubmitElectracianServiceRequestTenantToSubmitElectrcianServiceDtoInTenant(requestFields: SubmitElectracianServiceRequestTenant, user_id: string): SubmitElectrcianServiceDtoInTenant {
        return new SubmitElectrcianServiceDtoInTenant(
            requestFields.prefered_date,
            requestFields.notes,
            requestFields.room,
            requestFields.category,
            requestFields.describtion,
            user_id
            )
    }
}