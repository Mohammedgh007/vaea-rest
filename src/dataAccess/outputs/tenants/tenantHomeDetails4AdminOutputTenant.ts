import { TenantHomeDetailsOutputTenantRoommates } from "./tenantHomeDetailsOutputTenant"

/**
 * It represents the output fields of tenantDAO.loadHomeDetails
 */
export class TenantHomeDetails4AdminOutputTenant {

    unit_id: string 
    user_email: string
    apartment_name: string
    unit_images: Array<string>
    move_in: Date 
    move_out: Date
    unit_name: string
    lat: number 
    lon: number
    roommates: Array<TenantHomeDetailsOutputTenantRoommates>


    
    constructor(
        unit_id: string,
        user_email: string,
        apartment_name: string,
        unit_images: Array<string>,
        move_in: Date, 
        move_out: Date,
        unit_name: string,
        lat: number,
        lon: number,
        roommates: Array<TenantHomeDetailsOutputTenantRoommates>,
    ) {
        this.unit_id = unit_id
        this.user_email = user_email
        this.apartment_name = apartment_name
        this.unit_images = unit_images
        this.move_in = move_in
        this.move_out = move_out
        this.unit_name = unit_name
        this.lat = lat
        this.lon = lon
        this.roommates = roommates
    } 


    static mapQueryResultToTenantHomeDetails4AdminOutputTenant= (result: any): TenantHomeDetails4AdminOutputTenant => {
        let urlsArr: Array<string> = result.unit_images.split(",")

        return new TenantHomeDetails4AdminOutputTenant(
            result.unit_id,
            result.user_email,
            result.apartment_name,
            urlsArr,
            result.move_in,
            result.move_out,
            result.unit_name,
            result.lat,
            result.lon,
            result.roommates.map((roommateResult: any) => TenantHomeDetailsOutputTenantRoommates.mapQueryResultToTenantHomeDetailsOutputTenantRoommates(roommateResult)) 
        )
    }
}

