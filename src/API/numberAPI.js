import { instance } from "../API"

export const numberAPI = {
    getAPI() {
        return instance.get('startNumber').then(res => res.data)
    },
    getNumberAPI() {
        return instance.get('curentNumber').then(res => res.data)
    }
}