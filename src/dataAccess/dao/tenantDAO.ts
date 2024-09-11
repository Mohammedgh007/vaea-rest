import { Pool } from "mysql2";
import { DbConnectionManager } from "../../config/database/dbConnectionManager";
import { VerifyOTPInputTenant } from "../inputs/tenants/verifyOTPInputTenant";
import { SaveOTPCodeInputTenant } from "../inputs/tenants/saveOTPCodeInputTenant";
import RegistrationInputTenant from "../inputs/tenants/verifyAndAddInputTenant";
import bcrypt from 'bcrypt';
import RegistrInputTenant from "../inputs/tenants/verifyAndAddInputTenant";
import VerifyAndAddInputTenant from "../inputs/tenants/verifyAndAddInputTenant";
import { SignInInputTenant } from "../inputs/tenants/signInInputTenant";
import sqlstring from 'sqlstring'
import { UserInfoOutputTenant } from "../outputs/tenants/userInfoOutputTenant";
import { SearchUnitsInputTenant } from "../inputs/tenants/searchUnitsInputTenant";
import { SearchUnitsOutputTenant } from "../outputs/tenants/searchUnitsOutputTenant";
import { UnitDetailsOutputTenant } from "../outputs/tenants/unitDetailsOutput.tenant";
import { LeaseGenerationInputTenant } from "../inputs/tenants/leaseGenerationInputTenant";
import { GetMonthActivitiesInputTenant } from "../inputs/tenants/getMonthActivitiesInputTenant";
import { GetMonthActivitiesOutputTenant } from "../outputs/tenants/getMonthActivitiesOutputTenant";
import { ActivityDetailsOutputTenant } from "../outputs/tenants/activityDetailsOutputTenant";
import { UpdateAttendanceActivityInputTenant } from "../inputs/tenants/updateAttendanceActivityInput";
import { SubmitCleaningServiceInputTenant } from "../inputs/tenants/submitCleaningServiceInputTenant";
import { SubmitPlumbingServiceInputTenant } from "../inputs/tenants/submitPlumbingServiceInputTenant";
import { SubmitElectricianServiceInputTenant } from "../inputs/tenants/submitElectricianServiceInputTenant";
import { ServicesHistoryOutputTenant } from "../outputs/tenants/servicesHistoryOutputTenant";
import { TenantHomeDetailsOutputTenant } from "../outputs/tenants/tenantHomeDetailsOutputTenant";
import { TenantHomeDetails4AdminOutputTenant } from "../outputs/tenants/tenantHomeDetails4AdminOutputTenant";
import { ResetPasswordInputTenant } from "../inputs/tenants/resetPasswordInputTenant";

/**
 * It handles the interaction with the database.
 */
export class TenantDAO {

    private dbConnect: Pool

    constructor() {
        this.dbConnect = DbConnectionManager.connection
    }

    // It generates and stores otp code.
    saveOTPCode = async (queryInputs: SaveOTPCodeInputTenant): Promise<string> => {
        try {
            let otpCode: string = Math.round( Math.random() * 100000).toString();
            otpCode = (otpCode.length == 4) ? "0" + otpCode : otpCode;
            
            const sqlStr: string = `
            INSERT INTO otp(email_address, otp_code, otp_type) 
            values (${sqlstring.escape(queryInputs.email_address)}, ${sqlstring.escape(otpCode)}, ${sqlstring.escape(queryInputs.request_type)});
            `
            await this.dbConnect.promise().query(sqlStr)
            
            return otpCode;
        } catch(e) {
            console.log("error in saveOTPCode", e)
            throw e
        }
    }

    /**
     * queries the database to verify the given otp code, and it marks the otp as being used
     * @param queryInputs stores the required fields
     * @returns true if the verification successed
     */
    verifyOTP = async(queryInputs: VerifyOTPInputTenant): Promise<boolean> => {
        try {
            const sqlStr: string = `
            UPDATE otp
            SET has_verified = 1 
            WHERE created_at + interval 30 MINUTE >= now() AND email_address = ${sqlstring.escape(queryInputs.email_address)} AND otp_code = ${sqlstring.escape(queryInputs.otp_code)} AND has_verified = 0 AND id <> 0;
            `
            const result: any = await this.dbConnect.promise().query(sqlStr)
            return result[0].changedRows >= 1;
        } catch(e) {
            console.log("error in saveOTPCode", e)
            throw e
        }
    }

    /**
     * It adds the given user to the database after checking that the user used otp successfully
     * @param queryInputs stores the required fields
     * @returns the inserted user id.
     * @throws error when the user did not use the otp verification.
     */
    verifyAndAddTenant = async(queryInputs: VerifyAndAddInputTenant): Promise<number> => {
        try {
            const checkSqlStr: string = `
            UPDATE otp
            SET has_used = 1 
            WHERE has_verified = 1 AND email_address = ${sqlstring.escape(queryInputs.email_address)} AND otp_type = 'REGISTRATION' AND id <> 0;
            `
            const result: any = await this.dbConnect.promise().query(checkSqlStr)
            
            if(result[0].changedRows === 0) { throw new Error() }

            // adding user
            const profileField = (queryInputs.profile_image !== null) ? 'profile_image, ' : ''
            const profileValue = (queryInputs.profile_image !== null) ? `${queryInputs.profile_image}, ` : ''
            const hashedPassword: string = await bcrypt.hash(queryInputs.password, 10)
            const sqlStr = `
                insert into user_main(first_name, last_name, email_address, gender, ${profileField} id_iqama_number, settings_language, user_password, account_type, account_status)
                values(${sqlstring.escape(queryInputs.first_name)}, ${sqlstring.escape(queryInputs.last_name)}, ${sqlstring.escape(queryInputs.email_address)}, ${sqlstring.escape(queryInputs.gender)}, ${sqlstring.escape(profileValue)} ${sqlstring.escape(queryInputs.id_iqama_number)}, ${sqlstring.escape(queryInputs.language_iso)}, '${hashedPassword}', 'TENANT', 1);
             `
             const insertResult: any = await this.dbConnect.promise().query(sqlStr)
             return insertResult.insertId;
        } catch (e) {
            console.log("error in addTenant", e)
            throw e
        }
    }


    /**
     * It checks if the email has not been used
     * @param emailAddress stores the target email
     * @returns true if the email has not been used
     */
    verifyEmail = async(emailAddress: string): Promise<boolean> => {
        try {
            const sqlStr = `select email_address from vaea.user_main WHERE email_address = ${sqlstring.escape(emailAddress)}`
            const result: any = await this.dbConnect.promise().query(sqlStr)
            
            return result[0].length == 0
        } catch(e) {
            throw e
        }
    }


    /**
     * It retireves the user info
     * @param ueryInputs stores the required fields
     * @returns true if the email has not been used
     */
    loadUserInfo = async(queryInputs: SignInInputTenant): Promise<UserInfoOutputTenant> => {
        try {
            // retrieves user info.
            const sqlStr = `
            SELECT id, first_name, last_name, email_address, profile_image, settings_language, user_password
            FROM vaea.user_main
            WHERE email_address = ${sqlstring.escape(queryInputs.email_address)};
            `
            const result: any = await this.dbConnect.promise().query(sqlStr)

            // verifies password
            const isPasswordCorrect: boolean = bcrypt.compareSync(queryInputs.password, result[0][0].user_password)
            if (isPasswordCorrect) {
                return UserInfoOutputTenant.mapQueryResultToUserInfooutputTenant(result[0][0]) 
            } else {
                throw new Error()
            }
            
        } catch(e) {
            throw e
        }
    }


    /**
     * It retrieves the user email address.
     * @param user_id 
     */
    loadUserContacts = async(user_id: string): Promise<string> => {
        try {
            const sqlStr = `
            SELECT email_address FROM user_main WHERE id = ${sqlstring.escape(user_id)}
            `
            return (await this.dbConnect.promise().query(sqlStr))[0][0].email_address
        } catch (e) {
            throw e
        }
    }


    /**
     * It verifies the old password then it resets. Also, It verifies that there was a successful otp verification.
     * @param queryInputs 
     */
    verifiesPasswordAndResetPassword = async(queryInputs: ResetPasswordInputTenant): Promise<void> => {
        try {
            // verify otp verification 
            const verifyOTPSqlStr: string = `
            UPDATE otp
            SET has_used = 1 
            WHERE has_verified = 1 AND email_address = ${sqlstring.escape(queryInputs.email_address)} AND otp_type = 'RESET_PASSWORD' AND id <> 0;
            `
            const verifyOTPStep = async () => {
                const result: any = await this.dbConnect.promise().query(verifyOTPSqlStr)
                if(result[0].changedRows === 0) { return false }
                else {return true}
            }

            // verify the password
            const verirfyPasswordSqlStr = `
            SELECT user_password
            FROM vaea.user_main
            WHERE email_address = ${sqlstring.escape(queryInputs.email_address)};
            `
            const verifyPasswordStep = async () => {
                const result: any = await this.dbConnect.promise().query(verirfyPasswordSqlStr)
                const isPasswordCorrect: boolean = bcrypt.compareSync(queryInputs.old_password, result[0][0].user_password)
                if (isPasswordCorrect) {
                    return true;
                } else {
                    return false;
                }
            }

            // verification execution
            const isVerified: Array<Boolean> = await Promise.all<Boolean>([
                Promise.resolve(await verifyOTPStep()),
                Promise.resolve(await verifyPasswordStep())
            ])
            if (isVerified.includes(false)) {throw new Error()}

            // updating the password
            const hashedPassword = await bcrypt.hash(queryInputs.new_password, 10)
            const updatePasswordSqlStr = `
            UPDATE user_main 
            set user_password = '${hashedPassword}'
            WHERE email_address = ${sqlstring.escape(queryInputs.email_address)};
            `
            await this.dbConnect.promise().query(updatePasswordSqlStr)
        } catch(e) {
            throw e
        }
    }


    /**
     * It retrieves the list of available units.
     * @param ueryInputs stores the required fields
     * @returns the list of available units
     */
    searchUnit = async(queryInputs: SearchUnitsInputTenant): Promise< Array<SearchUnitsOutputTenant> > => {
        try {
            // setup pagination values 
            const resultSize: number = 10
            const offset: number = queryInputs.pager * resultSize

            // setup the filters strings
            const unitTypeFilterStr = (queryInputs.unit_type != null) ? `AND u.unit_type = ${sqlstring.escape(queryInputs.unit_type)} ` : ''
            const bathroomsFilterStr = (queryInputs.bathrooms != null) ? `AND u.bathrooms = ${sqlstring.escape(queryInputs.bathrooms)} ` : ''
            const bedRoomFilterStr = (queryInputs.bedrooms != null) ? `AND u.bedrooms = ${sqlstring.escape(queryInputs.bedrooms)} ` : ''
            const cityFilterStr = (queryInputs.city) ? `AND b.city = ${sqlstring.escape(queryInputs.city)} ` : ''
            const districtFilterStr = (queryInputs.district) ? `AND b.district = ${sqlstring.escape(queryInputs.district)} ` : ''
            const genderFilterStr = (queryInputs.gender) ?  `AND u.gender = ${sqlstring.escape(queryInputs.gender)} ` : ''
            const availabilityFilterStr = `AND u.available_quantity != 0 `
            const filtersStr = `${unitTypeFilterStr} ${bathroomsFilterStr} ${bedRoomFilterStr} ${cityFilterStr} ${districtFilterStr} ${genderFilterStr} ${availabilityFilterStr}`

            // setup the sorting strings
            const sortByStr = (queryInputs.sorting < 2) ? 'u.price' : 'u.area'
            const sortOrder = (queryInputs.sorting == 0 || queryInputs.sorting == 3) ? 'asc' : 'desc'
            const sorting = `${sortByStr} ${sortOrder}`

            // retrieves user info.
            const sqlStr = `
            SELECT u.id, u.unit_type, b.city, b.district, u.gender AS gender, b.lat, b.lon, u.bedrooms, u.bathrooms, group_concat(i.image_url SEPARATOR ',') as urls, u.listing_title, u.price, u.maximum_quantity AS capacity, u.available_quantity AS available_units  
            FROM vaea.unit u
            INNER JOIN vaea.building b ON b.id = u.building_id ${filtersStr}
            INNER JOIN vaea.unit_image i ON i.unit_id = u.id
            GROUP BY u.id
            ORDER BY ${sorting}  
            LIMIT ${offset},${resultSize}
            `

            const result: any = await this.dbConnect.promise().query(sqlStr)
            const output: Array<SearchUnitsOutputTenant> = result[0].map((unit: any) => SearchUnitsOutputTenant.mapQueryResultToSearchUnitsOutputTenant(unit))
            return output;
        } catch(e) {
            console.log("error", e)
            throw e
        }
    }

    /**
     * It retrieves the details of the given unit id.
     * @param unit_id stores the target unit id
     * @returns the details of the found unit
     */
    loadUnitDetails = async(emailAddress: string): Promise<UnitDetailsOutputTenant> => {
        try {
            const sqlStr = `
            SELECT u.id as unit_id, b.id as building_id, u.unit_type, b.city, b.district, u.gender AS gender, b.street, b.lat, b.lon, u.bedrooms, u.bathrooms, u.area, u.floor, group_concat(DISTINCT i.image_url SEPARATOR ',') as urls, u.listing_title, u.price, u.maximum_quantity AS capacity, u.available_quantity AS available_units 
            FROM vaea.unit u
            INNER JOIN vaea.building b ON b.id = u.building_id  AND u.id = ${sqlstring.escape(emailAddress)}
            INNER JOIN vaea.unit_image i ON i.unit_id = u.id
            GROUP BY u.id;
            `
            const result: any = await this.dbConnect.promise().query(sqlStr)
            if (result[0].length == 0) {
                throw new Error()
            }

            return UnitDetailsOutputTenant.mapQueryResultToUnitDetailsOutputTenant(result[0][0])
        } catch(e) {
            throw e
        }
    }


    /**
     * It locks the room prior to booking.
     * @param unit_id stores the target unit id
     * @param user_id stores the user id that wants to book
     * @returns true if it went successfully
     */
    lockUnitForBooking = async(unit_id: string, user_id: string): Promise<boolean> => {
        try {
            // check availability
            const sqlAvailability: string = `
            UPDATE unit 
            SET available_quantity = available_quantity - 1
            WHERE id = ${sqlstring.escape(unit_id)} AND available_quantity != 0
            `
            const result: any = await this.dbConnect.promise().query(sqlAvailability)
            if(result[0].changedRows === 0) { return false }

            // recording the lock
            const sqlLockRecording: string = `
            INSERT INTO booking_attempt (tenant_id, unit_id)
            VALUES (${sqlstring.escape(user_id)}, ${sqlstring.escape(unit_id)});
            `
            await this.dbConnect.promise().query(sqlLockRecording)

            return true;
        } catch(e) {
            throw e;
        }
    }
    

    /**
     * It unlocks the room after cancelling the booking.
     * @param unit_id stores the target unit id
     * @param user_id stores the user id that wants to book
     */
    releaseLockUnitForBooking = async(unit_id: string, user_id: string): Promise<void> => {
        try {
            // reset availability
            const sqlAvailability: string = `
            UPDATE unit 
            SET available_quantity = available_quantity + 1
            WHERE id = ${unit_id} AND EXISTS (
                SELECT b.id 
                FROM booking_attempt b
                WHERE b.tenant_id = ${sqlstring.escape(user_id)} AND b.unit_id = ${sqlstring.escape(unit_id)} AND b.has_used = 0 
            );
            `
            const result: any = await this.dbConnect.promise().query(sqlAvailability)
            if(result[0].changedRows === 0 ) { throw Error() }

            // recording the lock
            const sqlUnlockRecording: string = `
            UPDATE booking_attempt 
            SET has_used = 1
            WHERE tenant_id = ${sqlstring.escape(user_id)} AND unit_id = ${sqlstring.escape(unit_id)};
            `
            await this.dbConnect.promise().query(sqlUnlockRecording)
        } catch(e) {
            throw e;
        }
    }


    /**
     * It verifies that the user has aquired a lock for the given unit.
     * @param unit_id stores the target unit id
     * @param user_id stores the user id that wants to book
     * @returns true if there was an aquired lock.
     */
    verifyLock = async(unit_id: string, user_id: string): Promise<boolean> => {
        try {
            const veirfySql = `
            UPDATE booking_attempt
            SET has_used = 1 
            WHERE tenant_id = ${sqlstring.escape(user_id)} AND unit_id = ${sqlstring.escape(unit_id)} AND has_used = 0;
            `
            const result: any = await this.dbConnect.promise().query(veirfySql)
            if(result[0].changedRows === 0 ) { throw Error() }
            return true;
        } catch(e) {
            throw e;
        }
    }


    /**
     * It retireves the price of the given unit.
     * @param unit_id stores the target unit id.
     * @return either -1 or the price
     */
    retrieveUnitPrice = async(unit_id: string): Promise<number> => {
        try {
            const sql = `
            SELECT price FROM unit WHERE id = ${sqlstring.escape(unit_id)};
            `
            const result: any = await this.dbConnect.promise().query(sql)

            return result[0][0].price;
        } catch(e) {
            throw e;
        }
    }


    /**
     * It generates the booking lease assuming the user has paid.
     * @param inputFields stores all the needed info for the lease generation.
     * @returns the lease id.
     */
    generateLease = async(inputFields: LeaseGenerationInputTenant): Promise<number> => {
        let connection ;
        try {
            connection = await this.dbConnect.promise().getConnection()
            await connection.beginTransaction()

            // finding the landlord id number.
            const searchSql = `
            SELECT l.id 
            FROM landlord_portfolio l
            INNER JOIN building b ON l.id = b.landlord_id
            INNER JOIN unit u ON u.building_id = b.id AND u.id = ${sqlstring.escape(inputFields.unit_id)} ;
            `
            const searchResult = await connection.query(searchSql)
            const landlord_id = searchResult[0][0].id

            // generating the lease
            const formattedStartingDate = inputFields.starting_date.toISOString().slice(0, 19).replace('T', ' ')
            const formattedEndingDate = inputFields.ending_date.toISOString().slice(0, 19).replace('T', ' ')
            const leaseSql = `
            INSERT INTO lease(tenant_id, landlord_id, unit_id, period_type, start_date, end_date, payment_method)
            VALUES (${sqlstring.escape(inputFields.user_id)}, ${sqlstring.escape(landlord_id)}, ${sqlstring.escape(inputFields.unit_id)}, ${sqlstring.escape(inputFields.lease_period_type)},
             ${sqlstring.escape(formattedStartingDate)}, ${sqlstring.escape(formattedEndingDate)}, ${sqlstring.escape(inputFields.payment_provider)});
            `
            const result: any = await connection.query(leaseSql)

            const roomsNames = await this.loadUnitRooms(inputFields.unit_id, connection)
            const names = ["A", "B", "C", "D"]
            let unitName;
            if (roomsNames.length === 0) {
                unitName = names[0]
            } else {
                for (let i = 0; i < names.length; i++) {
                    if (!roomsNames.includes(names[i])) {
                        unitName = names[i]
                        break
                    }
                }
            }
            
            
            const insertDoorInfoSql = `
            INSERT INTO door_info(tenant_id, lease_id, door_name, unit_passcode, apartment_passcode, unit_id)
            VALUES(${sqlstring.escape(inputFields.user_id)}, ${result[0].insertId}, ${sqlstring.escape(unitName)}, '11111', '11111', ${sqlstring.escape(inputFields.unit_id)});
            `
            await connection.query(insertDoorInfoSql)

            await connection.commit()
            return result[0].insertId;
        } catch(e) {
            await connection.rollback()
            console.log("error in generateLease", e)
            throw e;
        }
    }


    /**
     * It loads the current rooms names for a given unit.
     * @param unit_id 
     * @param connection 
     * @returns 
     */
    loadUnitRooms = async(unit_id: string, connection: any): Promise<Array<string>> => {
        try {
            const sql = `
            SELECT di.door_name 
            FROM door_info di
            INNER JOIN lease le ON di.unit_id = ${sqlstring.escape(unit_id)} AND di.lease_id = le.id AND CURDATE() < le.end_date;
            `
            const result = await connection.query(sql) 
            return result[0].map((row: any) => row.door_name)
        } catch(e) {
            throw e
        }
    }


    /**
     * It verifies that an otp was verified for the given account. Next, it deletes
     * user data from the database.
     * @param user_id stores the user id that wants to delete his/her account.
     */
    verifyAndTerminate = async(user_id: string):  Promise<void> => {
        try {
            // verify using otp 
            const verifyOtpSql = `
            SELECT u.email_address AS email_address
            FROM user_main u 
            INNER JOIN otp o ON o.email_address = u.email_address AND o.has_used = 0 AND o.has_verified = 1 AND o.otp_type = 'TERMINATION' AND u.id = ${sqlstring.escape(user_id)};
            `
            const result: any = await this.dbConnect.promise().query(verifyOtpSql)
            const userEmail: string = result[0][0].email_address

            // delete user data from the user_main table 
            const deleteUserSql = ` DELETE FROM user_main WHERE id = ${sqlstring.escape(user_id)};  `
            await this.dbConnect.promise().query(deleteUserSql)

            // delete user data from otp verifications
            const deleteOtpSql = ` DELETE FROM otp WHERE email_address = '${userEmail}' AND id != 0;  `
            await this.dbConnect.promise().query(deleteOtpSql)
        } catch(e) {
            console.log("error in verifyAndTerminate", e)
            throw e
        }
    }


    /**
     * It retrieves the list of activies in a given month from the database.
     * @param inputFields 
     */
    loadActivitiesList = async(inputFields: GetMonthActivitiesInputTenant): Promise<Array<GetMonthActivitiesOutputTenant>> => {
        try {
            const sql = `
            SELECT al.id AS event_id, al.event_name AS event_name, ap.group_image_url AS group_image_url, al.event_datetime AS date_time, count( DISTINCT aa.id) AS going_people
            FROM activity_listing al
            INNER JOIN activity_group ap on al.activitiy_group_id = ap.id AND MONTH(al.event_datetime) = ${sqlstring.escape(inputFields.month)} AND city = ${sqlstring.escape(inputFields.city)}
            LEFT JOIN activity_attendance aa on aa.activitiy_listing_id = al.id
            GROUP BY al.id;
            `
            const result: any = await this.dbConnect.promise().query(sql)
            return result[0].map((row: any) => GetMonthActivitiesOutputTenant.mapQueryResultToGetMonthActivitiesOutputTenant(row))
        } catch(e) {
            console.log("error in loadActivitiesList", e)
            throw e
        }
    }


    /**
     * It load the details of the given activity.
     */
    loadActivityDetails = async(activity_id: string, user_id: string): Promise<ActivityDetailsOutputTenant> => {
        try {
            const sql1 = `
            SELECT 
                al.id AS event_id, 
                al.event_name AS event_name, 
                al.about AS event_about,
                group_concat(ai.image_url SEPARATOR ',') AS event_images_urls,
                ap.group_name AS group_name,
                ap.group_image_url AS group_image_url, 
                al.event_datetime AS date_time, 
                al.location AS location,
                al.lat AS lat,
                al.lon AS lon
            FROM activity_listing al
            INNER JOIN activity_group ap on al.activitiy_group_id = ap.id AND al.id = ${sqlstring.escape(activity_id)}
            INNER JOIN activity_listing_image ai ON ai.activitiy_listing_id = al.id
            GROUP BY al.id;
            `
            const sql2 = `
            SELECT count( DISTINCT aa.id) AS going_people,  (
                SELECT COUNT(aa.id)
                FROM activity_attendance aa
                WHERE aa.tenant_id = ${sqlstring.escape(user_id)} AND aa.activitiy_listing_id = ${sqlstring.escape(activity_id)}
                ) AS am_i_going
            FROM activity_listing al
            LEFT JOIN activity_attendance aa on aa.activitiy_listing_id = al.id AND al.id= ${sqlstring.escape(activity_id)};
            `
            let result: any = await this.dbConnect.promise().query(sql1)
            const goingResult = (await this.dbConnect.promise().query(sql2))[0][0]
            result[0][0].going_people = goingResult.going_people
            result[0][0].am_i_going = goingResult.am_i_going
            
            if (result[0].length !== 1 ) {
                throw Error("")
            } 

            return ActivityDetailsOutputTenant.mapQueryResultToActivityDetailsOutputTenant(result[0][0])
             
        } catch(e) {
            console.log("error in loadActivitiesDetails", e)
            throw e
        }
    }


    /// It updates the status of attendance for the user.
    updateAttendanceActivity = async(queryFields: UpdateAttendanceActivityInputTenant): Promise<void> =>{
        try {
            if (queryFields.is_attending) { // inserting attending
                const sql = `INSERT INTO activity_attendance(activitiy_listing_id, tenant_id) VALUES(${sqlstring.escape(queryFields.activity_id)}, ${sqlstring.escape(queryFields.user_id)})`
                await this.dbConnect.promise().query(sql)
            } else { // removing attending
                const sql = `DELETE FROM activity_attendance WHERE activitiy_listing_id = ${sqlstring.escape(queryFields.activity_id)} AND tenant_id = ${sqlstring.escape(queryFields.user_id)}`
                await this.dbConnect.promise().query(sql)
            }
        } catch(e) {
            console.log("error in updateAttendanceActivity", e)
            throw e
        }
    }


    // It is used to retrieves the history of service request for the given tenant.
    loadServicesRequestHistory = async(user_id: string): Promise<Array<ServicesHistoryOutputTenant>> => {
        try {
            const sqlCleaning = `
            SELECT 
                id AS request_id,
                request_status AS status,
                created_at AS order_date,
                appointment AS appointment_date
            FROM cleaning_service_request 
            WHERE tenant_id = ${sqlstring.escape(user_id)};
            `
            const sqlPlumbing = `
            SELECT 
                id AS request_id,
                request_status AS status,
                created_at AS order_date,
                appointment AS appointment_date
            FROM plumbing_service_request 
            WHERE tenant_id = ${sqlstring.escape(user_id)};
            `
            const sqlElectrician = `
            SELECT 
                id AS request_id,
                request_status AS status,
                created_at AS order_date,
                appointment AS appointment_date
            FROM electrician_service_request 
            WHERE tenant_id = ${sqlstring.escape(user_id)};
            `

            const results = await Promise.all([
                Promise.resolve( (await this.dbConnect.promise().query(sqlCleaning))[0] ),
                Promise.resolve( (await this.dbConnect.promise().query(sqlPlumbing))[0] ),
                Promise.resolve( (await this.dbConnect.promise().query(sqlElectrician))[0] ),
            ])
            
            const cleaningRequests = results[0].map((request: any) => ServicesHistoryOutputTenant.mapQueryResultToServicesHistoryOutputTenant(request, 'CLEANING'))
            const plumbingRequests = results[1].map((request: any) => ServicesHistoryOutputTenant.mapQueryResultToServicesHistoryOutputTenant(request, 'PLUMBING'))
            const electricianRequests = results[2].map((request: any) => ServicesHistoryOutputTenant.mapQueryResultToServicesHistoryOutputTenant(request, 'ELECTRICIAN'))
            return [...cleaningRequests, ...plumbingRequests, ...electricianRequests]
        } catch(e) {
            console.log("error in loadServicesRequestHistory", e)
            throw e
        }
    }


    // It is used to check if the tenant has an active lease or not and/or get his/her lease id.
    getTenantLeaseId = async(user_id: string): Promise<number> => {
        try {
            const sql = `
            SELECT id
            FROM lease  
            WHERE tenant_id = ${sqlstring.escape(user_id)} AND CURDATE() < end_date
            `
            const result = await this.dbConnect.promise().query(sql)
            return (result[0].length !== 0) ? result[0][0].id : -1
        } catch(e) {
            console.log("error in doesTenantHasLease", e)
            throw new Error()
        }
    }


    // It is used to submit the cleaning service
    submitCleanHouse = async(queryFields: SubmitCleaningServiceInputTenant): Promise<number> => {
        try {
            const sql = `
            INSERT INTO cleaning_service_request(
                tenant_id, 
                lease_id,
                prefered_date, 
                tenant_notes
                )
            VALUES(
                ${sqlstring.escape(queryFields.user_id)},
                ${sqlstring.escape(queryFields.lease_id)},
                ${sqlstring.escape(queryFields.prefered_date)},
                ${sqlstring.escape(queryFields.notes)}
                )
            `
        
            const result = await this.dbConnect.promise().query(sql);
            return result[0].insertId;
        } catch(e) {
            console.log("error in submitCleanHouse", e)
            throw e
        }
    }


    // It is used to submit the plumbing service
    submitPlumbing = async(queryFields: SubmitPlumbingServiceInputTenant): Promise<number> => {
        try {
            const sql = `
            INSERT INTO plumbing_service_request(
                tenant_id, 
                lease_id,
                prefered_date, 
                tenant_notes,
                room,
                category,
                issue_describtion
                )
            VALUES(
                ${sqlstring.escape(queryFields.user_id)},
                ${sqlstring.escape(queryFields.lease_id)},
                ${sqlstring.escape(queryFields.prefered_date)},
                ${sqlstring.escape(queryFields.notes)},
                ${sqlstring.escape(queryFields.room)},
                ${sqlstring.escape(queryFields.category)},
                ${sqlstring.escape(queryFields.describtion)}
                )
            `
            
            const result = await this.dbConnect.promise().query(sql);
            return result[0].insertId;
        } catch(e) {
            console.log("error in submitCleanHouse", e)
            throw e
        }
    }

    // It is used to submit the electrcian service 
    submitElectrcian = async(queryFields: SubmitElectricianServiceInputTenant): Promise<number> => {
        try {
            const sql = `
            INSERT INTO electrician_service_request(
                tenant_id, 
                lease_id,
                prefered_date, 
                tenant_notes,
                room,
                category,
                issue_describtion
                )
            VALUES(
                ${sqlstring.escape(queryFields.user_id)},
                ${sqlstring.escape(queryFields.lease_id)},
                ${sqlstring.escape(queryFields.prefered_date)},
                ${sqlstring.escape(queryFields.notes)},
                ${sqlstring.escape(queryFields.room)},
                ${sqlstring.escape(queryFields.category)},
                ${sqlstring.escape(queryFields.describtion)}
                )
            `

            const result = await this.dbConnect.promise().query(sql);
            return result[0].insertId;
        } catch(e) {
            console.log("error in submitElectrcian", e)
            throw e
        }
    } 


    /**
     * It retrieves the home info for the given user.
     * @param user_id 
     */
    loadHomeDetails = async(lease_id: number, user_id: string): Promise<TenantHomeDetailsOutputTenant> => {
        try {
            const tenantHomeSql = `
            SELECT 
                di.unit_id AS unit_id,
                un.apartment_name AS apartment_name,
                le.start_date AS move_in,
                le.end_date AS move_out,
                di.door_name AS unit_name,
                bu.lat AS lat,
                bu.lon AS lon,
                group_concat(ui.image_url SEPARATOR ',') AS unit_images
            FROM door_info di
            INNER JOIN lease le ON le.id = di.lease_id AND le.id = ${sqlstring.escape(lease_id)}
            INNER JOIN unit un ON un.id = di.unit_id 
            INNER JOIN unit_image ui ON ui.unit_id = un.id
            INNER JOIN building bu ON bu.id = un.building_id
            GROUP BY di.id
            `
            const tenantHomeResults = await this.dbConnect.promise().query(tenantHomeSql);

            const roommatesSql = `
            SELECT 
                um.first_name AS first_name,
                um.last_name AS last_name,
                um.profile_image AS roommate_image,
                di.door_name AS unit_name
            FROM door_info di
            INNER JOIN user_main um ON di.tenant_id = um.id AND um.id != ${sqlstring.escape(user_id)} AND di.unit_id = ${sqlstring.escape(tenantHomeResults[0][0].unit_id)}
            INNER JOIN lease le ON le.id = di.lease_id AND CURDATE() < le.end_date;
            `
            tenantHomeResults[0][0].roommates = (await this.dbConnect.promise().query(roommatesSql))[0];

            
            return TenantHomeDetailsOutputTenant.mapQueryResultToTenantHomeDetailsOutputTenant(tenantHomeResults[0][0])
        } catch(e) {
            console.log("error in loadHomeDetails", e)
            throw e
        }
    }

    /**
     * It retrieves the home info and the user info for the given id.
     * @param user_id 
     */
    loadHomeDetails4Admin = async(lease_id: number, user_id: string): Promise<TenantHomeDetails4AdminOutputTenant> => {
        try {
            const tenantHomeSql = `
            SELECT 
                di.unit_id AS unit_id,
                um.email_address AS user_email,
                un.apartment_name AS apartment_name,
                le.start_date AS move_in,
                le.end_date AS move_out,
                di.door_name AS unit_name,
                bu.lat AS lat,
                bu.lon AS lon,
                group_concat(ui.image_url SEPARATOR ',') AS unit_images
            FROM door_info di
            INNER JOIN lease le ON le.id = di.lease_id AND le.id = ${sqlstring.escape(lease_id)}
            INNER JOIN unit un ON un.id = di.unit_id 
            INNER JOIN unit_image ui ON ui.unit_id = un.id
            INNER JOIN building bu ON bu.id = un.building_id
            INNER JOIN user_main um ON um.id = ${user_id} && um.id = le.tenant_id
            GROUP BY di.id
            `
            const tenantHomeResults = await this.dbConnect.promise().query(tenantHomeSql);

            const roommatesSql = `
            SELECT 
                um.first_name AS first_name,
                um.last_name AS last_name,
                um.profile_image AS roommate_image,
                di.door_name AS unit_name
            FROM door_info di
            INNER JOIN user_main um ON di.tenant_id = um.id AND um.id != ${sqlstring.escape(user_id)} AND di.unit_id = ${sqlstring.escape(tenantHomeResults[0][0].unit_id)}
            INNER JOIN lease le ON le.id = di.lease_id AND CURDATE() < le.end_date;
            `
            tenantHomeResults[0][0].roommates = (await this.dbConnect.promise().query(roommatesSql))[0];

            return TenantHomeDetails4AdminOutputTenant.mapQueryResultToTenantHomeDetails4AdminOutputTenant(tenantHomeResults[0][0])
        } catch(e) {
            console.log("error in loadHomeDetails", e)
            throw e
        }
    }

}
