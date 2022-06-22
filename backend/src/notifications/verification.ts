import nodemailer from "nodemailer"

export const transporter2 = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.NOTIFICATION_USER || "ibrahim.task@outlook.com",
    pass: process.env.NOTIFICATION_PASS || "Password123456789"
  }

})

export function sendVerification(mail: string, verificationLink: string) {
  return {
    from: "ibrahim.task@outlook.com",
    to: mail,
    subject: `verification code for todo`,
    html:
      `click this link to veriify <a href="${verificationLink}">${verificationLink}</a> `
  }
}
export function sendReset(mail: string, resetLink: string) {
  return {
    from: "ibrahim.task@outlook.com",
    to: mail,
    subject: `reset link`,
    html:
      `click this link to reset <a href="${resetLink}">${resetLink}</a> `
  }
}