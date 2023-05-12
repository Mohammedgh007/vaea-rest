"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailManager = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * It setups the email and make it accessible in the project.
 */
class EmailManager {
}
_a = EmailManager;
// It is used by configCoordinator to setup the email service
EmailManager.setupEmail = () => {
    EmailManager.notificationTransporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "mohammed@rentvaea.com",
            pass: "sjrzfjnyohsfupbl",
        }
    });
};
// It sends a notification email
EmailManager.sendNotificationEmail = (to, subject, content) => {
    const mailOptions = {
        from: "mohammed@rentvaea.com",
        to: to,
        subject: subject,
        text: content
    };
    try {
        _a.notificationTransporter.sendMail(mailOptions);
    }
    catch (e) {
        console.log("error in sending email ", e);
    }
};
exports.EmailManager = EmailManager;
