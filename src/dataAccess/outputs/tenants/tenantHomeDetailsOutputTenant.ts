/**
 * It represents the output fields of tenantDAO.loadHomeDetails
 */
export class TenantHomeDetailsOutputTenant {

    unit_id: string 
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
        this.apartment_name = apartment_name
        this.unit_images = unit_images
        this.move_in = move_in
        this.move_out = move_out
        this.unit_name = unit_name
        this.lat = lat
        this.lon = lon
        this.roommates = roommates
    } 


    static mapQueryResultToTenantHomeDetailsOutputTenant = (result: any): TenantHomeDetailsOutputTenant => {
        let urlsArr: Array<string> = result.unit_images.split(",")

        return new TenantHomeDetailsOutputTenant(
            result.unit_id,
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


export class TenantHomeDetailsOutputTenantRoommates {

    first_name: string 
    last_name: string
    unit_name: string 
    roommate_image: string 

    constructor (
        first_name: string ,
        last_name: string,
        unit_name: string ,
        roommate_image: string,
    ) {
        this.first_name = first_name 
        this.last_name = last_name
        this.unit_name = unit_name 
        this.roommate_image = roommate_image 
    }


    static mapQueryResultToTenantHomeDetailsOutputTenantRoommates = (result: any): TenantHomeDetailsOutputTenantRoommates => {
        return new TenantHomeDetailsOutputTenantRoommates(
            result.first_name ,
            result.last_name,
            result.unit_name ,
            result.roommate_image
        )
    }
}