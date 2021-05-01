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