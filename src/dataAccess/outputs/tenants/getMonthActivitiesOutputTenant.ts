/**
 * It represents the output fields of tenantDAO.loadActivitiesList
 */
export class GetMonthActivitiesOutputTenant {

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


    static mapQueryResultToGetMonthActivitiesOutputTenant = (result: any): GetMonthActivitiesOutputTenant => {

        return new GetMonthActivitiesOutputTenant(
            result.event_id,
            result.event_name,
            result.group_name,
            result.group_image_url,
            result.date_time,
            result.going_people,
        )
    }
}