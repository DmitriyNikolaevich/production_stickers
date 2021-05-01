import { numberAPI } from "../API/numberAPI"

let initializeState = {
    startNumber: 1,
    copy: 2,
    copyCount: 1,
    config: {
        background: "white",
        marginTop: "20px",
        marginBottom: "20px",
        width: 2,
        height: 30
    }
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

        default:
            return state
    }
}

export const actions = {
    setStartNumber: (startNumber) => ({ type: 'Stickers/stickerReducer/SET_STARTNUMBER', payload: { startNumber } }),
    setCopyAction: (copy) => ({ type: 'Stickers/stickerReducer/SET_COPY', payload: { copy } }),
    setCopyCountAction: (copyCount) => ({ type: 'Stickers/stickerReducer/SET_COPY_COUNT', payload: { copyCount } })
}

export const getNumber = (calback) => {
    return async (dispatch) => {
        let response = await numberAPI.getAPI().then(resp => resp.values[0][0]['number'])
        dispatch(actions.setStartNumber(response))
        setTimeout(calback,0)
    }
}

export default stickerReducer