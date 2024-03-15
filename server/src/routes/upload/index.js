import express from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'

import sendEmailNotification from '../../components/send-mail.js'

const router = express()
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads'
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage }).fields([{ name: 'file', maxCount: 1 }])

router.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err)
            return res.status(500).json({ error: 'Failed to upload file' })
        }

        try {
            const uploadedFile = req.files.file[0]
            const userEmail = req.body.email
            const filePath = uploadedFile.path

            await sendEmailNotification(uploadedFile, userEmail)

            res.status(200).json({ message: 'File uploaded successfully', filePath })
        } catch (error) {
            console.error('Error uploading file:', error)
            res.status(500).json({ error: 'Failed to upload file' })
        }
    })
})

router.get('/uploads', (req, res) => {
    const uploadPath = 'uploads'

    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err)
            return res.status(500).json({ error: 'Failed to read directory' })
        }

        const fileList = files.filter(
            (file) => !fs.statSync(path.join(uploadPath, file)).isDirectory()
        )

        res.status(200).json({ files: fileList })
    })
})

router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename
    const filePath = path.join('uploads', filename)

    if (fs.existsSync(filePath)) {
        res.download(filePath)
    } else {
        res.status(404).json({ error: 'File not found' })
    }
})

router.use('/uploads', express.static(path.join(__dirname, 'uploads')))

export default router
