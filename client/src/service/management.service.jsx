import httpRequest from "./http-request"

const management = {
    uploadFile: (payload) => {
        return httpRequest.post(`http://localhost:8080/upload`, payload)
    },
    getFileUploadList: () => {
        return httpRequest.get(`http://localhost:8080/uploads`)
    },
    downloadFile: (name) => {
        return `http://localhost:8080/download/${name}`
    }
}

export default management
