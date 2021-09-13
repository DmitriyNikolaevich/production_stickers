import Axios from "axios"


export const instance = Axios.create({
    withCredentials: false,
    baseURL: 'http://192.168.11.11:3500/'
})