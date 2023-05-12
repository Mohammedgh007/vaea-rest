import { SearchUnitsRequestTenant } from "../../../presentation/requests/tenants/searchUnitsRequestTenant"

/**
 * This class represents the fields for tenantService.seachUnits
 */
export class SearchUnitsDtoTenant {

    // all fields are optional
    unit_type: string | null // must be either SHARED or PRIVATE
    city: string | null // must be either RIYADH, KHOBAR, JEDDAH
    district: string | null
    bedrooms: number | null
    bathrooms: number | null
    sorting: number // it is either 0, 1, 2, or 3
    pager: number // starts from 0 then increment by 1

    constructor(
        unit_type: string | null ,
        city: string | null , 
        district: string | null ,
        bedrooms: number | null,
        bathrooms: number | null,
        sorting: number,
        pager: number
    ) {
        this.unit_type = (unit_type) ? unit_type : null 
        this.city = (city) ? city : null
        this.district = (district) ? district : null
        this.bedrooms = (bedrooms) ? bedrooms : null
        this.bathrooms = (bathrooms) ? bathrooms : null
        this.sorting = sorting
        this.pager = pager
    }


    static mapSearchUnitsRequestTenantToSearchUnitsDtoTenant(requestField: SearchUnitsRequestTenant): SearchUnitsDtoTenant {
        return new SearchUnitsDtoTenant(
            requestField.unit_type,
            requestField.city,
            requestField.district,
            requestField.bedrooms,
            requestField.bathrooms,
            requestField.sorting,
            requestField.pager
        )
    }
}