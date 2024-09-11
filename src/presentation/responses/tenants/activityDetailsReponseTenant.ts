
import { ActivityDetailsDtoOutTenant } from "../../../business/dtoOut/tenants/activityDetailsDtoOutTenant"
import { ActivityDetailsOutputTenant } from "../../../dataAccess/outputs/tenants/activityDetailsOutputTenant"

// It representds the fields in data within the response of Tenant.getActivityDetails
export class ActivityDetailsResponseTenant {

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


    static mapActivityDetailsDtoOutTenantToActivityDetailsResponseTenant = (output: ActivityDetailsDtoOutTenant): ActivityDetailsResponseTenant => {

        return new ActivityDetailsResponseTenant(
            output.event_id,
            output.event_name,
            output.event_about,
            output.event_images_urls,
            output.group_name,
            output.group_image_url,
            output.date_time,
            output.location,
            output.lat,
            output.lon,
            output.going_people,
            output.am_i_going
        )
    }


    static getDummy(activity_id: any): ActivityDetailsResponseTenant { 
        const images = [
            "https://images.pexels.com/photos/1329645/pexels-photo-1329645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1329645/pexels-photo-1329645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1329645/pexels-photo-1329645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1329645/pexels-photo-1329645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1329645/pexels-photo-1329645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1329645/pexels-photo-1329645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ]
        const image_url = "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        let about = "About Event Text. About Event Text. About Event Text. About Event Text. About Event Text.About Event Text.About Event Text."
        about += "\n" + "About Event Text.About Event Text. About Event Text.About Event Text. About Event Text. About Event Text. About Event Text."
        about += "\n" + "About Event Text.About Event Text. About Event Text.About Event Text. About Event Text. About Event Text. About Event Text."
        about += "\n" + "About Event Text.About Event Text. About Event Text.About Event Text. About Event Text. About Event Text. About Event Text."
        let location = "Location Discribtion. Location Discribtion. Location Discribtion. Location Discribtion. Location Discribtion. Location Discribtion."
        location += "\n" + "Location Discribtion. Location Discribtion. Location Discribtion. Location Discribtion. Location Discribtion. Location Discribtion."
        location += "\n" + "Location Discribtion. Location Discribtion. Location Discribtion. Location Discribtion. Location Discribtion. Location Discribtion."
        return new ActivityDetailsResponseTenant(activity_id, "Board Games Night", about, images, "Board Games Group", image_url, new Date(), location, 12, 12, 32, true)
    }



}