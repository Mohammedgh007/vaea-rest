import { UpdateAttendanceDtoInTenant } from "../../../business/dtoIn/tenants/updateAttendanceActivityDtoInTenant"


/**
 * It represents the required fields of tenantDAO.updateAttendanceActivity
 */
export class UpdateAttendanceActivityInputTenant {

    activity_id: string 
    is_attending: boolean 
    user_id: string

    constructor(
        activity_id: string,
        is_attending: boolean,
        user_id: string
    ) {
        this.activity_id = activity_id 
        this.is_attending = is_attending
        this.user_id = user_id
    }

    static mapUpdateAttendanceDtoInTenantToUpdateAttendanceActivityInputTenant(serviceFields: UpdateAttendanceDtoInTenant): UpdateAttendanceActivityInputTenant {
        return new UpdateAttendanceActivityInputTenant(
            serviceFields.activity_id,
            serviceFields.is_attending,
            serviceFields.user_id
            )
    }
}