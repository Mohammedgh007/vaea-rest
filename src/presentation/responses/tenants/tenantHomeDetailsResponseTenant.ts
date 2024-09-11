import { TenantHomeDetailsDtoOutTenant, TenantHomeDetailsDtoOutTenantRoommates } from "../../../business/dtoOut/tenants/tenantHomeDetailsDtoOutTenant"


/**
 * It represents the output fields of tenantRouter.getMyHomeDetails
 */
export class TenantHomeDetailsResponseTenant {

    unit_id: string 
    apartment_name: string
    unit_images: Array<string>
    move_in: Date 
    move_out: Date
    unit_name: string
    lat: number 
    lon: number
    roommates: Array<TenantHomeDetailResponseTenantRoommates>


    
    constructor(
        unit_id: string,
        apartment_name: string,
        unit_images: Array<string>,
        move_in: Date, 
        move_out: Date,
        unit_name: string,
        lat: number,
        lon: number,
        roommates: Array<TenantHomeDetailResponseTenantRoommates>,
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


    static mapTenantHomeDetailsDtoOutTenantToTenantHomeDetailsResponseTenant = (serviceResult: TenantHomeDetailsDtoOutTenant): TenantHomeDetailsResponseTenant => {

        return new TenantHomeDetailsResponseTenant(
            serviceResult.unit_id,
            serviceResult.apartment_name,
            serviceResult.unit_images,
            serviceResult.move_in,
            serviceResult.move_out,
            serviceResult.unit_name,
            serviceResult.lat,
            serviceResult.lon,
            serviceResult.roommates.map((roommate) => TenantHomeDetailResponseTenantRoommates.mapTenantHomeDetailsDtoOutTenantRoommatesTo(roommate))
        )
    }
}

export class TenantHomeDetailResponseTenantRoommates {

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


    static mapTenantHomeDetailsDtoOutTenantRoommatesTo = (serviceResult: TenantHomeDetailsDtoOutTenantRoommates): TenantHomeDetailResponseTenantRoommates => {
        return new TenantHomeDetailResponseTenantRoommates(
            serviceResult.first_name ,
            serviceResult.last_name,
            serviceResult.unit_name ,
            serviceResult.roommate_image
        )
    }
}