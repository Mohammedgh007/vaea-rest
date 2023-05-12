"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUnitsInputTenant = void 0;
/**
 * This class represents the fields for tenantDao.seachUnits
 */
class SearchUnitsInputTenant {
    constructor(unit_type, city, district, bedrooms, bathrooms, sorting, pager) {
        this.unit_type = (unit_type) ? unit_type : null;
        this.city = (city) ? city : null;
        this.district = (district) ? district : null;
        this.bedrooms = (bedrooms) ? bedrooms : null;
        this.bathrooms = (bathrooms) ? bathrooms : null;
        this.sorting = sorting;
        this.pager = pager;
    }
    static mapSearchUnitsDtoTenantToSearchUnitsInputTenant(serviceFields) {
        return new SearchUnitsInputTenant(serviceFields.unit_type, serviceFields.city, serviceFields.district, serviceFields.bedrooms, serviceFields.bathrooms, serviceFields.sorting, serviceFields.pager);
    }
}
exports.SearchUnitsInputTenant = SearchUnitsInputTenant;
