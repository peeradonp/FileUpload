import request from 'supertest'
import app from '../index.js'

describe('File Upload API', () => {
    it('should upload a file successfully', async () => {
        const res = await request(app)
            .post('/upload')
            .attach('file', 'uploads/upload-file-go-here.md')
            .field('email', 'peeradon.od185@gmail.com')

        expect(res.status).toEqual(200)
        expect(res.body.message).toEqual('File uploaded successfully')
        expect(res.body.filePath).toBeDefined()
    })

    it('should list uploaded files', async () => {
        const res = await request(app).get('/uploads')

        expect(res.status).toEqual(200)
        expect(res.body.files).toBeDefined()
    })

    it('should download an existing file', async () => {
        const res = await request(app).get('/download/upload-file-go-here.md')

        expect(res.status).toEqual(200)
    })

    it('should return 404 for downloading a non-existing file', async () => {
        const res = await request(app).get('/download/nonexistent.txt')

        expect(res.status).toEqual(404)
    })
})
