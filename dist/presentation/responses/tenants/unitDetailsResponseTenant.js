"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitDetailsResponseTenant = void 0;
/**
 * It represents the output fields of tenantRouter.unitDetails
 */
class UnitDetailsResponseTenant {
    constructor(unit_id, building_id, unit_type, district, street, lat, lon, bedroms, bathrooms, area, floor, urls, listing_title, price) {
        this.unit_id = unit_id;
        this.building_id = building_id;
        this.unit_type = unit_type;
        this.district = district;
        this.street = street;
        this.lat = lat;
        this.lon = lon;
        this.bedroms = bedroms;
        this.bathrooms = bathrooms;
        this.area = area;
        this.floor = floor;
        this.urls = urls;
        this.listing_title = listing_title;
        this.price = price;
    }
}
UnitDetailsResponseTenant.mapUnitDetailsOutputTenantToUnitDetailsResponseTenant = (serviceResult) => {
    return new UnitDetailsResponseTenant(serviceResult.unit_id, serviceResult.building_id, serviceResult.unit_type, serviceResult.district, serviceResult.street, serviceResult.lat, serviceResult.lon, serviceResult.bedroms, serviceResult.bathrooms, serviceResult.area, serviceResult.floor, serviceResult.urls, serviceResult.listing_title, serviceResult.price);
};
exports.UnitDetailsResponseTenant = UnitDetailsResponseTenant;
