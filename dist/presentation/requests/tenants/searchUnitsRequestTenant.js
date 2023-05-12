"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUnitsRequestTenant = void 0;
/**
 * This class represents the fields for tenantRouter.seachUnits
 */
class SearchUnitsRequestTenant {
    constructor(unit_type, city, district, bedrooms, bathrooms, sorting, pager) {
        this.unit_type = (unit_type) ? unit_type : null;
        this.city = (city) ? city : null;
        this.district = (district) ? district : null;
        this.bedrooms = (bedrooms) ? bedrooms : null;
        this.bathrooms = (bathrooms) ? bathrooms : null;
        this.sorting = sorting;
        this.pager = pager;
    }
    static mapJsonToSearchUnitsRequestTenant(req) {
        return new SearchUnitsRequestTenant(req.query.unit_type, req.query.city, req.query.district, req.query.bedrooms, req.query.bathrooms, req.query.sorting, req.query.pager);
    }
}
exports.SearchUnitsRequestTenant = SearchUnitsRequestTenant;
