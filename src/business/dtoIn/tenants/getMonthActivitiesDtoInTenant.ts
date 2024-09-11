import { ConfirmBookingRequestTenant } from "../../../presentation/requests/tenants/confirmBookingRequestTenant"
import { GetMonthActivitiesRequestTenant } from "../../../presentation/requests/tenants/getMonthActivitiesRequestTenant"

/**
 * This class represents the fields for tenantService.confirmBooking
 */
export class GetMonthActivitiesDtoIn {

    month: number // must be between 1-12 
    city: string // must be either RIYADH, KHOBAR, JEDDAH

    constructor(
        month: number ,
        city: string
    ) {
        this.month = month 
        this.city = city
    }


    static mapGetMonthActivitiesRequestTenantToGetMonthActivitiesDtoIn(requestFields: GetMonthActivitiesRequestTenant): GetMonthActivitiesDtoIn {
        return new GetMonthActivitiesDtoIn(
            requestFields.month,
            requestFields.city,
        )
    }
}