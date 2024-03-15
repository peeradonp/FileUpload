import nodemailer from 'nodemailer'
// must be in .env --------------------------
const USER_GMAIL = process.env.MAIL || 'mockuploadfile@gmail.com'
const USER_PASS = process.env.PASSWORD || 'lxmbftcopnelhlie' // will remove
// ------------------------------------------

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.email',
    secure: false,
    service: 'gmail',
    auth: {
        user: USER_GMAIL,
        pass: USER_PASS
    }
})

const sendEmailNotification = async (uploadedFile, userEmail) => {
    const mailOptions = {
        from: USER_GMAIL,
        to: userEmail,
        subject: 'File Uploaded Successfully',
        text: `Your file ${uploadedFile.originalname} has been uploaded successfully.`
    }

    await transporter.sendMail(mailOptions)
}

export default sendEmailNotification
