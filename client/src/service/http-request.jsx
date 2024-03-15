import axios from "axios"

axios.interceptors.response.use(
    (response) => {
        return Promise.resolve(response)
    },

    async (error) => {
        return Promise.reject(error?.response || error)
    }
)

axios.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

const httpRequest = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
}

export default httpRequest
