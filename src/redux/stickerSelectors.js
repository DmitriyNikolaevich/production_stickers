export const getStartNumberSelector = (state) => {
    return state.stickers.startNumber
}

export const getCopySelector = (state) => {
    return state.stickers.copy
}

export const getCopyCountSelector = (state) => {
    return state.stickers.copyCount
}

export const getConfigSelector = (state) => {
    return state.stickers.config
}

export const getRepeatStickerValue = (state) => {
    return state.stickers.repeatedValue
}

export const getLocation = (state) => {
    return state.stickers.location
}

export const getLPUList = (state) => {
    return state.stickers.LPUList
}

export const getLocations = (state) => {
    return state.stickers.locationsList
}

export const getNewLocation = (state) => {
    return state.stickers.newLocation
}

export const getSelectedLocation = (state) => {
    return state.stickers.selectedLocation
}