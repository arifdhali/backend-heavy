import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: 'gregory.russel@ethereal.email',
        pass: 'fR4jYgRvenyB683TRe'
    }
})

export default transporter;