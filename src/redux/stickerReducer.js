import { ThunkAction } from "redux-thunk"

let initializeState = {
    startNumber: 237
}

let stickerReducer = (state = initializeState, action) => {
    switch (action.type) {
        case 'Stickers/stickerReducer/SET_STARTNUMBER':
            return {
                ...state,
                startNumber: action.payload.startNumber
            }

        default:
            return state
    }
}

export const actions = {
    setStartNumber: (startNumber) => ({type: 'Stickers/stickerReducer/SET_STARTNUMBER', payload: { startNumber }})
}

export default stickerReducer