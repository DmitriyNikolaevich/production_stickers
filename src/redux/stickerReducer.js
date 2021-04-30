import { numberAPI } from "../API/numberAPI"

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

export const getNumber = () => {
    debugger
    return async (dispatch) => {
        debugger
        let response = await numberAPI.getNumber()
        console.log(numberAPI.getNumber());
        debugger
        dispatch(actions.setStartNumber(response))
    }
}

export default stickerReducer