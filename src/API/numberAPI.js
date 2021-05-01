import { instance } from "../API"

export const numberAPI = {
    getAPI() {
        return instance.get('startNumber').then(res => res.data)
    }
}