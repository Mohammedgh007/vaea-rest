import { SearchUnitsOutputTenant } from "../../../dataAccess/outputs/tenants/searchUnitsOutputTenant"
import { TenantHomeDetailsOutputTenant, TenantHomeDetailsOutputTenantRoommates } from "../../../dataAccess/outputs/tenants/tenantHomeDetailsOutputTenant"

/**
 * It represents the output fields of tenantService.getTeantHomeDetails
 */
export class TenantHomeDetailsDtoOutTenant {

    unit_id: string 
    apartment_name: string
    unit_images: Array<string>
    move_in: Date 
    move_out: Date
    unit_name: string
    lat: number 
    lon: number
    roommates: Array<TenantHomeDetailsDtoOutTenantRoommates>


    
    constructor(
        unit_id: string,
        apartment_name: string,
        unit_images: Array<string>,
        move_in: Date, 
        move_out: Date,
        unit_name: string,
        lat: number,
        lon: number,
        roommates: Array<TenantHomeDetailsDtoOutTenantRoommates>,
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




    static mapSearchUnitsOutputTenantToTenantHomeDetailsDtoOutTenant = (daoResult: TenantHomeDetailsOutputTenant): TenantHomeDetailsDtoOutTenant => {

        return new TenantHomeDetailsDtoOutTenant(
            daoResult.unit_id,
            daoResult.apartment_name,
            daoResult.unit_images,
            daoResult.move_in,
            daoResult.move_out,
            daoResult.unit_name,
            daoResult.lat,
            daoResult.lon,
            daoResult.roommates.map((roomate) => TenantHomeDetailsDtoOutTenantRoommates.mapTenantHomeDetailsOutputTenantRoommatesToTenantHomeDetailsDtoOutTenantRoommates(roomate))
        )
    }
}


export class TenantHomeDetailsDtoOutTenantRoommates {

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


    static mapTenantHomeDetailsOutputTenantRoommatesToTenantHomeDetailsDtoOutTenantRoommates = (daoResult: TenantHomeDetailsOutputTenantRoommates): TenantHomeDetailsDtoOutTenantRoommates => {
        return new TenantHomeDetailsDtoOutTenantRoommates(
            daoResult.first_name ,
            daoResult.last_name,
            daoResult.unit_name ,
            daoResult.roommate_image
        )
    }
}