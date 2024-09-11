/**
 * It represents the output fields of tenantDAO.loadActivityDetails
 */
export class ActivityDetailsOutputTenant {

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


    static mapQueryResultToActivityDetailsOutputTenant = (result: any): ActivityDetailsOutputTenant => {
        let urlsArr: Array<string> = result.event_images_urls.split(",")
        
        return new ActivityDetailsOutputTenant(
            result.event_id,
            result.event_name,
            result.event_about,
            urlsArr,
            result.group_name,
            result.group_image_url,
            result.date_time,
            result.location,
            result.lat,
            result.lon,
            result.going_people,
            result.am_i_going == 1
        )
    }
}