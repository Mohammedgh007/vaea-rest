import { ActivityDetailsOutputTenant } from "../../../dataAccess/outputs/tenants/activityDetailsOutputTenant"
import { GetMonthActivitiesOutputTenant } from "../../../dataAccess/outputs/tenants/getMonthActivitiesOutputTenant"

/**
 * It represents the output fields of tenantService.getActivityDetails
 */
export class ActivityDetailsDtoOutTenant {

    event_id: string
    event_name: string
    event_about: string
    event_images_urls: Array<String>
    group_name: string
    group_image_url: string
    date_time: Date
    location: string
    lat: number 
    lon: number
    going_people: number
    am_i_going: boolean


    constructor(
        event_id: string,
        event_name: string,
        event_about: string,
        event_images_urls: Array<String>,
        group_name: string,
        group_image_url: string,
        date_time: Date,
        location: string,
        lat: number,
        lon: number,
        going_people: number,
        am_i_going: boolean
    ) {
        this.event_id = event_id 
        this.event_name = event_name 
        this.event_about = event_about
        this.event_images_urls = event_images_urls
        this.group_name = group_name 
        this.group_image_url = group_image_url
        this.date_time = date_time
        this.location = location
        this.lat = lat 
        this.lon = lon
        this.going_people = going_people
        this.am_i_going = am_i_going
    } 


    static mapActivityDetailsOutputTenantToActivityDetailsOutputTenant = (daoResult: ActivityDetailsOutputTenant): ActivityDetailsDtoOutTenant => {
        
        return new ActivityDetailsDtoOutTenant(
            daoResult.event_id,
            daoResult.event_name,
            daoResult.event_about,
            daoResult.event_images_urls,
            daoResult.group_name,
            daoResult.group_image_url,
            daoResult.date_time,
            daoResult.location,
            daoResult.lat,
            daoResult.lon,
            daoResult.going_people,
            daoResult.am_i_going
        )
    }
}