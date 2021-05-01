import { numberAPI } from "../API/numberAPI"

let initializeState = {
    startNumber: 1,
    repeatedValue: 0,
    copy: 2,
    copyCount: 1,
    config: {
        background: "white",
        marginTop: "20px",
        marginBottom: "20px",
        width: 2,
        height: 30
    },
    userID: 0,
    location: ''
}

let stickerReducer = (state = initializeState, action) => {
    switch (action.type) {
        case 'Stickers/stickerReducer/SET_STARTNUMBER':
            return {
                ...state,
                startNumber: action.payload.startNumber
            }

        case 'Stickers/stickerReducer/SET_COPY':
            return {
                ...state,
                copy: action.payload.copy
            }

        case 'Stickers/stickerReducer/SET_COPY_COUNT':
            return {
                ...state,
                copyCount: action.payload.copyCount
            }

        case 'Stickers/stickerReducer/SET_REPEAT_STICKER_VALUE':
            return {
                ...state,
                repeatedValue: action.payload.value
            }

        case 'Stickers/stickerReducer/SET_USERID':
            return {
                ...state,
                userID: action.payload.userID
            }

        case 'Stickers/stickerReducer/SET_LOCATION':
            return {
                ...state,
                location: action.payload.location
            }

        default:
            return state
    }
}

export const actions = {
    setStartNumber: (startNumber) => ({ type: 'Stickers/stickerReducer/SET_STARTNUMBER', payload: { startNumber } }),
    setCopyAction: (copy) => ({ type: 'Stickers/stickerReducer/SET_COPY', payload: { copy } }),
    setCopyCountAction: (copyCount) => ({ type: 'Stickers/stickerReducer/SET_COPY_COUNT', payload: { copyCount } }),
    setRepeatStickerValue: (value) => ({ type: 'Stickers/stickerReducer/SET_REPEAT_STICKER_VALUE', payload: { value } }),
    setUserID: (userID) => ({ type: 'Stickers/stickerReducer/SET_USERID', payload: { userID } }),
    setLocation: (location) => ({ type: 'Stickers/stickerReducer/SET_LOCATION', payload: { location } })
}

export const printStickersThunk = (calback, id) => {
    return async (dispatch) => {
        let response = await numberAPI.getNumber(id).then(resp => resp.values[0][0]['number'])
        dispatch(actions.setStartNumber(response))
        setTimeout(calback,0)
    }
}

export const printRepeatNumberThunk = (value, printCalback) => {
    return (dispatch) => {
        dispatch(actions.setStartNumber(value))
        setTimeout(printCalback, 0)
        dispatch(actions.setRepeatStickerValue(0))
    }
}

export const showLocationThunk = (id) => {
    return async (dispatch) => {
        let LPU = await numberAPI.getLocation(id).then(res => res.values[0][0])
        dispatch(actions.setLocation(LPU.name + ': ' + LPU.location))
    }
}

export default stickerReducer