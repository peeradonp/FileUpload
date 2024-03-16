import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.email',
    secure: false,
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    }
})

const sendEmailNotification = async (uploadedFile, userEmail) => {
    const mailOptions = {
        from: process.env.MAIL,
        to: userEmail,
        subject: 'File Uploaded Successfully',
        text: `Your file ${uploadedFile.originalname} has been uploaded successfully.`
    }

    await transporter.sendMail(mailOptions)
}

export default sendEmailNotification
