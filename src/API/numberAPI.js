import { instance } from "../API"

export const numberAPI = {
    getAPI() {
        return instance.get('number').then(res => res.data)
    }
}