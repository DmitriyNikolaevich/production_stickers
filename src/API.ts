import Axios from "axios"


export const instance = Axios.create({
    withCredentials: false,
    baseURL: 'http://localhost:3500/'
})