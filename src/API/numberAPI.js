import { instance } from "../API"

export const numberAPI = {
    getNumber(id) {
        return instance.get(`startNumber/?id=${id}`).then(res => res.data)
    },
    getLocation(id) {
        return instance.get(`getLocation/?id=${id}`).then(res => res.data)
    }
}