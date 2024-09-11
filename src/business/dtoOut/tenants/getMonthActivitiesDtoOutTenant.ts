import { GetMonthActivitiesOutputTenant } from "../../../dataAccess/outputs/tenants/getMonthActivitiesOutputTenant"
import { SearchUnitsOutputTenant } from "../../../dataAccess/outputs/tenants/searchUnitsOutputTenant"

/**
 * It represents the output fields of tenantService.getAcitivitiesList
 */
export class GetMonthActivitiesDtoOutTenant {

    event_id: string
    event_name: string
    group_name: string
    group_image_url: string
    date_time: Date
    going_people: number


    constructor(
        event_id: string,
        event_name: string,
        group_name: string,
        group_image_url: string,
        date_time: Date,
        going_people: number
    ) {
        this.event_id = event_id 
        this.event_name = event_name 
        this.group_name = group_name 
        this.group_image_url = group_image_url
        this.date_time = date_time
        this.going_people = going_people
    } 


    static mapGetMonthActivitiesOutputTenantToGetMonthActivitiesDtoOutTenant = (daoResult: GetMonthActivitiesOutputTenant): GetMonthActivitiesDtoOutTenant => {

        return new GetMonthActivitiesDtoOutTenant(
            daoResult.event_id,
            daoResult.event_name,
            daoResult.group_name,
            daoResult.group_image_url,
            daoResult.date_time,
            daoResult.going_people,
        )
    }
}