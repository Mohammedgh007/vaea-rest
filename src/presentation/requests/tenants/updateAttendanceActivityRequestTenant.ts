import { SignInDtoOutTenant } from "../../../business/dtoOut/tenants/signInDtoOutTenant"

// It representds the fields in data within the response of Tenant.updateAttendance
export class UpdateAttendanceActivityRequestTenant {

   
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


    static mapJsonToUpdateAttendanceActivityRequestTenant(req: any): UpdateAttendanceActivityRequestTenant {
        return new UpdateAttendanceActivityRequestTenant(
            req.body.activity_id,
            req.body.is_attending,
            req.body.user_id
        )
        
    }


}