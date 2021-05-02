import { instance } from "../API"

export const numberAPI = {
    getNumber(id) {
        return instance.get(`startNumber/?id=${id}`).then(res => res.data)
    },
    getLocation(id) {
        return instance.get(`getLocation/?id=${id}`).then(res => res.data)
    },
    getLPU() {
        return instance.get('/getlpu').then(res => res.data)
    },
    getAllLocations() {
        return instance.get('/getalllocations').then(res => res.data)
    },
    postNewLocation(data) {
        return instance.post(`/postnewlocation/:${data}`).then(res => res)
    }
}