import { GetMonthActivitiesDtoOutTenant } from "../../../business/dtoOut/tenants/getMonthActivitiesDtoOutTenant"
import { SignInDtoOutTenant } from "../../../business/dtoOut/tenants/signInDtoOutTenant"

// It representds the fields in data within the response of Tenant.getMonthActivities
export class GetMonthActivitiesResponseTenant {

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


    static mapGetMonthActivitiesDtoOutTenantTOGetMonthActivitiesResponseTenant = (output: GetMonthActivitiesDtoOutTenant) => {
        return new GetMonthActivitiesResponseTenant(
            output.event_id,
            output.event_name,
            output.group_name,
            output.group_image_url,
            output.date_time,
            output.going_people,
        )
    }


    static getDummy(month: number): Array<GetMonthActivitiesResponseTenant> { 
        const image_url1 = "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        const image_url2 = "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        if (month === 7) {
            console.log("innnnn")
            return [
                new GetMonthActivitiesResponseTenant("1", "Board Games Night", "Board Games Group", image_url2, new Date("July 7, 2023 20:30:00"), 13),
                new GetMonthActivitiesResponseTenant("3", "Chess Night", "Chess Group", image_url1, new Date("July 14, 2023 20:30:00"), 12),
                new GetMonthActivitiesResponseTenant("5", "Board Games Night", "Board Games Group", image_url2, new Date("July 21, 2023 20:30:00"), 30)
            ]
        } else if (month == 9) {
            return [
                new GetMonthActivitiesResponseTenant("7", "Board Games Night", "Board Games Group", image_url2, new Date("July 4, 2023 20:30:00"), 33),
                new GetMonthActivitiesResponseTenant("9", "Chess Night", "Chess Group", image_url1, new Date("July 11, 2023 20:30:00"), 12),
                new GetMonthActivitiesResponseTenant("11", "Board Games Night", "Board Games Group", image_url2, new Date("July 18, 2023 20:30:00"), 41)
            ]
        } else {
            return []
        }
    }



}