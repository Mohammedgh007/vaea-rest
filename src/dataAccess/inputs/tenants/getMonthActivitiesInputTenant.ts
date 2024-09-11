import { ConfirmBookingDtoInTenant } from "../../../business/dtoIn/tenants/confirmBookingDtoInTenant"
import { GetMonthActivitiesDtoIn } from "../../../business/dtoIn/tenants/getMonthActivitiesDtoInTenant"

/**
 * It stores the fields of tenantDAO.loadActivitiesList
 */
export class GetMonthActivitiesInputTenant {

    month: number // must be between 1-12 
    city: string // must be either RIYADH, KHOBAR, JEDDAH

    constructor(
        month: number ,
        city: string
    ) {
        this.month = month 
        this.city = city
    } 

    static mapGetMonthActivitiesDtoInToGetMonthActivitiesInputTenant(serviceFields: GetMonthActivitiesDtoIn): GetMonthActivitiesInputTenant {
        return new GetMonthActivitiesInputTenant(
            serviceFields.month,
            serviceFields.city
        )
    }

}