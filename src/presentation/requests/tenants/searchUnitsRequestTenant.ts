/**
 * This class represents the fields for tenantRouter.seachUnits
 */
export class SearchUnitsRequestTenant {

    // all fields are optional except page
    unit_type: string | null // must be either SHARED or PRIVATE
    city: string | null // must be either RIYADH, KHOBAR, JEDDAH
    district: string | null
    bedrooms: number | null
    bathrooms: number | null
    sorting: number // from 0 to 3
    pager: number // starts from 0 then increment by 1

    constructor(
        unit_type: string | null,
        city: string | null, 
        district: string | null,
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


    static mapJsonToSearchUnitsRequestTenant(req: any): SearchUnitsRequestTenant {
        return new SearchUnitsRequestTenant(
            req.query.unit_type,
            req.query.city,
            req.query.district,
            req.query.bedrooms,
            req.query.bathrooms,
            req.query.sorting,
            req.query.pager
        )
    }
}