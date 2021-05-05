import { numberAPI } from "../API/numberAPI"

let initializeState = {
    startNumber: 1,
    repeatedValue: 0,
    copy: 1,                                //количество печатаемых одинаковых этикеток
    copyCount: 0,                           //количество печатаемых номеров
    config: {
        background: "white",
        marginTop: "20px",
        marginBottom: "20px",
        width: 2,
        height: 30
    },
    userID: 0,
    location: '',
    LPUList: [],
    locationsList: [],
    newLocation: {
        lpu: 0,
        location: ''
    },
    selectedLocation: 0,
    filteredLocations: []
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

        case 'Stickers/stickerReducer/SET_LPU_LIST':
            return {
                ...state,
                LPUList: action.payload.list
            }

        case 'Stickers/stickerReducer/SET_LOCATIONS':
            return {
                ...state,
                locationsList: action.payload.locations
            }

        case 'Stickers/stickerReducer/SET_NEW_LOCATION_LPU':
            return {
                ...state,
                newLocation: {
                    lpu: action.payload.newLocationLPU,
                    location: state.newLocation.location
                }
            }

        case 'Stickers/stickerReducer/SET_NEW_LOCATION_LOCATION':
            return {
                ...state,
                newLocation: {
                    lpu: state.newLocation.lpu,
                    location: action.payload.newLocationLocation
                }
            }

        case 'Stickers/stickerReducer/SET_SELECTED_LOCATION':
            return {
                ...state,
                selectedLocation: action.payload.location
            }

        case 'Stickers/stickerReducer/SET_FILTERED_LOCATION':
            return {
                ...state,
                filteredLocations: action.payload.filteredLocations
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
    setLocation: (location) => ({ type: 'Stickers/stickerReducer/SET_LOCATION', payload: { location } }),
    setLPUList: (list) => ({ type: 'Stickers/stickerReducer/SET_LPU_LIST', payload: { list } }),
    setLocations: (locations) => ({ type: 'Stickers/stickerReducer/SET_LOCATIONS', payload: { locations } }),
    setNewLocationLPU: (newLocationLPU) => ({ type: 'Stickers/stickerReducer/SET_NEW_LOCATION_LPU', payload: { newLocationLPU } }),
    setNewLocationLocation: (newLocationLocation) => ({ type: 'Stickers/stickerReducer/SET_NEW_LOCATION_LOCATION', payload: { newLocationLocation } }),
    setSelectedLocation: (location) => ({ type: 'Stickers/stickerReducer/SET_SELECTED_LOCATION', payload: { location } }),
    setFilteredLocations: (filteredLocations) => ({ type: 'Stickers/stickerReducer/SET_FILTERED_LOCATION', payload: { filteredLocations } })
}

export const printStickersThunk = (calback, id) => {
    return async (dispatch) => {
        let response = await numberAPI.getNumber(id).then(resp => resp.values[0][0]['number'])
        dispatch(actions.setStartNumber(response))
        setTimeout(calback, 0)
    }
}

export const printRepeatNumberThunk = (value, printCalback, id) => {
    return (dispatch) => {
        dispatch(actions.setStartNumber(value))
        dispatch(actions.setCopyCountAction(1))
        setTimeout(printCalback, 0)
        dispatch(actions.setRepeatStickerValue(0))
        getLocationCopyCount(id)
    }
}

export const showLocationThunk = (id) => {
    return async (dispatch) => {
        let LPU = await numberAPI.getLocation(id).then(res => res.values[0][0])
        dispatch(actions.setLocation(LPU.name + ': ' + LPU.location))
    }
}

export const getLPUThunk = () => {
    return async (dispatch) => {
        let LPU = await numberAPI.getLPU().then(res => res.values[0])
        dispatch(actions.setLPUList(LPU))
    }
}

export const getAllLocations = () => {
    return async (dispatch) => {
        let locations = await numberAPI.getAllLocations().then(res => res.values[0])
        dispatch(actions.setLocations(locations))
    }
}

export const insertNewLocatoin = (data) => {
    return async (dispatch) => {
        await numberAPI.postNewLocation(data).then(res => {
            dispatch(getAllLocations())
        });
    }
}

export const deleteLocation = (id) => {
    return async (dispatch) => {
        await numberAPI.deleteLocation(id).then(res => {
            dispatch(getAllLocations())
        })
    }
}

export const setLocationCopyCount = (copyCount) => {
    return async (dispatch) => {
        await numberAPI.getLocationCopyCount(JSON.stringify(copyCount)).then(res => {
            if (res.status === 200) {
                dispatch(actions.setCopyCountAction(copyCount.copyCount))
            } else {
                console.log(res.values)
            }
        })
    }
}

export const getLocationCopyCount = (id) => {
    return async (dispatch) => {
        await numberAPI.getCopyCountForLocation(id).then(res => {
            if (res.status === 200) {
                dispatch(actions.setCopyCountAction(res.values[0].copy))
            } else {
                console.log(res.values)
            }
        })
    }
}

export const getFilteredLocations = (selectedLPU) => {
    return async (dispatch) => {
        await numberAPI.getFilteredLocations(selectedLPU).then(res => {
            dispatch(actions.setFilteredLocations(res.values[0]))
        })
    }
}

export default stickerReducer