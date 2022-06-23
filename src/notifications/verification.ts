import nodemailer from "nodemailer"

export const transporter2 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NOTIFICATION_USER || "bluedevolopment.task@gmail.com",
    pass: process.env.NOTIFICATION_PASS || "Hema_123456789"
  }

})

export function sendVerification(mail: string, verificationLink: string) {
  return {
    from: "bluedevolopment.task@gmail.com",
    to: mail,
    subject: `verification code for todo`,
    html:
      `click this link to veriify <a href="${verificationLink}">${verificationLink}</a> `
  }
}
export function sendReset(mail: string, resetLink: string) {
  return {
    from: "bluedevolopment.task@gmail.com",
    to: mail,
    subject: `reset link`,
    html:
      `click this link to reset <a href="${resetLink}">${resetLink}</a> `
  }
}