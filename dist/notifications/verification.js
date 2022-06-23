"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReset = exports.sendVerification = exports.transporter2 = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter2 = nodemailer_1.default.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.NOTIFICATION_USER || "ibrahim.task@outlook.com",
        pass: process.env.NOTIFICATION_PASS || "Password123456789"
    }
});
function sendVerification(mail, verificationLink) {
    return {
        from: "ibrahim.task@outlook.com",
        to: mail,
        subject: `verification code for todo`,
        html: `click this link to veriify <a href="${verificationLink}">${verificationLink}</a> `
    };
}
exports.sendVerification = sendVerification;
function sendReset(mail, resetLink) {
    return {
        from: "ibrahim.task@outlook.com",
        to: mail,
        subject: `reset link`,
        html: `click this link to reset <a href="${resetLink}">${resetLink}</a> `
    };
}
exports.sendReset = sendReset;
