import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "fusionxpress71@gmail.com",
        pass: process.env.SMTP_PASSWORD
    },
    from: "fusionxpress71@gmail.com"
});