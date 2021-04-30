import Axios from "axios"


export const instance = Axios.create({
    withCredentials: false,
    baseURL: 'http://127.0.0.1:3500/'
})