import { LPUListType, LocationsListType, FilteredLocationsType } from './../redux/stickerReducer';
import { instance } from "../API"

export const numberAPI = {
    getNumber(data: string) {
        return instance.get<numberAPIgetNumberResponseType>(`startNumber/${data}`).then(res => res.data)
    },
    getLocation(id: number) {
        return instance.get<numberAPIgetLocationResponseType>(`getLocation/?id=${id}`).then(res => res.data)
    },
    getLPU() {
        return instance.get<numberAPIgetLPUResponseType>('/getlpu').then(res => res.data)
    },
    getAllLocations() {
        return instance.get<numberAPIgetAllLocationsResponseType>('/getalllocations').then(res => res.data)
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
        return instance.get<numberAPIgetCopyCountForLocationResponseType>(`/getcopycountforlocation/${id}`).then(res => res.data)
    },
    getFilteredLocations(selectedLPU: number) {
        return instance.get<numberAPIgetFilteredLocationsResponseType>(`/getfilteredlocations/${selectedLPU}`).then(res => res.data)
    },
    getUserBatchAccess(id: number) {
        return instance.get<numberAPIgetUserBatchAccessResponseType>(`/getuserbatchaccess/${id}`).then(res => res.data)
    }
}

export type numberAPIgetNumberResponseType = {
    status: number
    values: number
}

export type numberAPIgetCopyCountForLocationResponseType = {
    status: number
    values: number
}

export type numberAPIgetLocationResponseType = {
    status: number
    values: {
        location: string
        name: string
    }
}

export type numberAPIgetUserBatchAccessResponseType = {
    status: number
    values: number
}

export type numberAPIgetLPUResponseType = {
    status: number
    values: Array<LPUListType>
}

export type numberAPIgetAllLocationsResponseType = {
    status: number
    values: Array<LocationsListType>
}

export type numberAPIgetFilteredLocationsResponseType = {
    status: number
    values: Array<FilteredLocationsType>
}