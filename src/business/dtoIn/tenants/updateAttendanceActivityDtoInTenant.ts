import { UpdateAttendanceActivityRequestTenant } from "../../../presentation/requests/tenants/updateAttendanceActivityRequestTenant"


/**
 * This class represents the fields for tenantService.updateActivityAttendance
 */
export class UpdateAttendanceDtoInTenant {

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


    static mapUpdateAttendanceActivityRequestTenantToupdateAttendanceDtoInTenant(requestFields: UpdateAttendanceActivityRequestTenant): UpdateAttendanceDtoInTenant {
        return new UpdateAttendanceDtoInTenant(
            requestFields.activity_id,
            requestFields.is_attending,
            requestFields.user_id
        )
    }
}