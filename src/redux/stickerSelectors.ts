import { AppStateType } from "./redux"

export const getStartNumberSelector = (state: AppStateType) => {
    return state.stickers.startNumber
}

export const getCopySelector = (state: AppStateType) => {
    return state.stickers.copy
}

export const getCopyCountSelector = (state: AppStateType) => {
    return state.stickers.copyCount
}

export const getConfigSelector = (state: AppStateType) => {
    return state.stickers.config
}

export const getRepeatStickerValue = (state: AppStateType) => {
    return state.stickers.repeatedValue
}

export const getLocation = (state: AppStateType) => {
    return state.stickers.location
}

export const getLPUList = (state: AppStateType) => {
    return state.stickers.LPUList
}

export const getLocations = (state: AppStateType) => {
    return state.stickers.locationsList
}

export const getNewLocation = (state: AppStateType) => {
    return state.stickers.newLocation
}

export const getSelectedLocation = (state: AppStateType) => {
    return state.stickers.selectedLocation
}

export const getFilteredLocationsSelector = (state: AppStateType) => {
    return state.stickers.filteredLocations
}

export const getUserIDSelector = (state: AppStateType) => {
    return state.stickers.userID
}