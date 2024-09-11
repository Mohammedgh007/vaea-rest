import { EmailManager } from "../../config/email/emailManager"

/**
 * It handles sending email notifications to vaea admins
 */
export class NotificationService {

    notifyBooking = () => {

    }


    /**
     * It sends a notification to the vaea admin for cleaning house request.
     * @param requestId 
     * @param lon 
     * @param lat 
     * @param preferredDate 
     * @param notes 
     */
    notifyRequestCleaningService = (requestId: string, userEmail: string, lon: number, lat: number, apartmentName: string,
        unitName: string, preferredDate: Date, notes: string) => {
            const title = "Cleaning Request " + requestId + " has been submitted"
            let text = "Cleaning Request number: " + requestId
            text += "\n" + "User email: " + userEmail
            text += "\n" + "The location: " + `https://maps.google.com/?ll=${lat},${lon}`
            text += "\n" + "The apartment name: " + apartmentName
            text += "\n" + "The unit name: " + unitName 
            text += "\n" + "The prefered date: " + `${preferredDate.getDate()}-${preferredDate.getMonth() + 1}-${preferredDate.getFullYear()}`
            text += "\n" + "The user notes (if exists): " + notes
            EmailManager.sendNotificationEmail(process.env.NOTIFY_SERVICE as string, title, text)
    }


    /**
     * It sends a notification to the vaea admin for plumbing request.
     * @param requestId 
     * @param lon 
     * @param lat 
     * @param preferredDate 
     * @param notes 
     */
    notifyRequestPlumbingService = (requestId: string, userEmail: string, lon: number, lat: number, apartmentName: string,
        unitName: string, preferredDate: Date, room: string, category: string, description: string, notes: string) => {
            const title = "Plumbing Request " + requestId + " has been submitted"
            let text = "Cleaning Request number: " + requestId
            text += "\n" + "User email: " + userEmail
            text += "\n" + "The location: " + `https://maps.google.com/?ll=${lat},${lon}`
            text += "\n" + "The apartment name: " + apartmentName
            text += "\n" + "The unit name: " + unitName 
            text += "\n" + "The prefered date: " + `${preferredDate.getDate()}-${preferredDate.getMonth() + 1}-${preferredDate.getFullYear()}`
            text += "\n" + "The room: " + room 
            text += "\n" + "The category: " + category
            text += "\n" + "The decription: " + description
            text += "\n" + "The user notes (if exists): " + notes
            EmailManager.sendNotificationEmail(process.env.NOTIFY_SERVICE as string, title, text)
    }


    /**
     * It sends a notification to the vaea admin for electrician request.
     * @param requestId 
     * @param lon 
     * @param lat 
     * @param preferredDate 
     * @param notes 
     */
    notifyRequestElectricianService = (requestId: string, userEmail: string, lon: number, lat: number, apartmentName: string,
        unitName: string, preferredDate: Date, room: string, category: string, description: string, notes: string) => {
            const title = "Electrician Request " + requestId + " has been submitted"
            let text = "Cleaning Request number: " + requestId
            text += "\n" + "User email: " + userEmail
            text += "\n" + "The location: " + `https://maps.google.com/?ll=${lat},${lon}`
            text += "\n" + "The apartment name: " + apartmentName
            text += "\n" + "The unit name: " + unitName 
            text += "\n" + "The prefered date: " + `${preferredDate.getDate()}-${preferredDate.getMonth() + 1}-${preferredDate.getFullYear()}`
            text += "\n" + "The room: " + room 
            text += "\n" + "The category: " + category
            text += "\n" + "The decription: " + description
            text += "\n" + "The user notes (if exists): " + notes
            EmailManager.sendNotificationEmail(process.env.NOTIFY_SERVICE as string, title, text)
    }
}