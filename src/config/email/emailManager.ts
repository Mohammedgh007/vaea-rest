import nodemailer from 'nodemailer'

/**
 * It setups the email and make it accessible in the project.
 */
export class EmailManager {

    private static notificationTransporter: nodemailer.Transporter;
    
    // It is used by configCoordinator to setup the email service
    static setupEmail = () => {
        EmailManager.notificationTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "mohammed@rentvaea.com",
                pass: "sjrzfjnyohsfupbl",
            }
        });
    }


    // It sends a notification email
    static sendNotificationEmail = (to: string, subject: string, content: string) => {
        const mailOptions = {
            from: "mohammed@rentvaea.com",
            to: to,
            subject: subject,
            text: content
        }

        try {
            this.notificationTransporter.sendMail(mailOptions)
        } catch(e) {
            console.log("error in sending email ", e)
        }
        
    }
}
