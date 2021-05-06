import { instance } from "../API"

export const numberAPI = {
    getNumber(id: number) {
        return instance.get(`startNumber/?id=${id}`).then(res => res.data)
    },
    getLocation(id: number) {
        return instance.get(`getLocation/?id=${id}`).then(res => res.data)
    },
    getLPU() {
        return instance.get('/getlpu').then(res => res.data)
    },
    getAllLocations() {
        return instance.get('/getalllocations').then(res => res.data)
    },
    postNewLocation(data: string) {
        return instance.post(`/postnewlocation/${data}`).then(res => res)
    },
    deleteLocation(id: number) {
        return instance.delete(`/deletelocation/${id}`).then(res => res.data)
    },
    getLocationCopyCount(id: string) {
        return instance.get(`/locationcopycount/${id}`).then(res => res.data)
    },
    getCopyCountForLocation(id: number) {
        return instance.get(`/getcopycountforlocation/${id}`).then(res => res.data)
    },
    getFilteredLocations(selectedLPU: number) {
        return instance.get(`/getfilteredlocations/${selectedLPU}`).then(res => res.data)
    }
}