"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReset = exports.sendVerification = exports.transporter2 = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter2 = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NOTIFICATION_USER || "bluedevolopment.task@gmail.com",
        pass: process.env.NOTIFICATION_PASS || "Hema_123456789"
    }
});
function sendVerification(mail, verificationLink) {
    return {
        from: "bluedevolopment.task@gmail.com",
        to: mail,
        subject: `verification code for todo`,
        html: `click this link to veriify <a href="${verificationLink}">${verificationLink}</a> `
    };
}
exports.sendVerification = sendVerification;
function sendReset(mail, resetLink) {
    return {
        from: "bluedevolopment.task@gmail.com",
        to: mail,
        subject: `reset link`,
        html: `click this link to reset <a href="${resetLink}">${resetLink}</a> `
    };
}
exports.sendReset = sendReset;
