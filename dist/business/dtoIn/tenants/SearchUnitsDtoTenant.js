"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUnitsDtoTenant = void 0;
/**
 * This class represents the fields for tenantService.seachUnits
 */
class SearchUnitsDtoTenant {
    constructor(unit_type, city, district, bedrooms, bathrooms, sorting, pager) {
        this.unit_type = (unit_type) ? unit_type : null;
        this.city = (city) ? city : null;
        this.district = (district) ? district : null;
        this.bedrooms = (bedrooms) ? bedrooms : null;
        this.bathrooms = (bathrooms) ? bathrooms : null;
        this.sorting = sorting;
        this.pager = pager;
    }
    static mapSearchUnitsRequestTenantToSearchUnitsDtoTenant(requestField) {
        return new SearchUnitsDtoTenant(requestField.unit_type, requestField.city, requestField.district, requestField.bedrooms, requestField.bathrooms, requestField.sorting, requestField.pager);
    }
}
exports.SearchUnitsDtoTenant = SearchUnitsDtoTenant;
