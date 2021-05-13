import { InfernActionTypes, BaseThunkType, AppDispatch } from './redux';
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
    user: {
        id: 0,
        batchAccess: false
    },
    location: '',
    LPUList: [] as Array<LPUListType>,
    locationsList: [] as Array<LocationsListType>,
    newLocation: {
        lpu: 0,
        location: ''
    } as LocationListType,
    selectedLocation: 0,
    filteredLocations: [] as Array<FilteredLocationsType>
}

let stickerReducer = (state:initializeStateType = initializeState, action: ActionType): initializeStateType => {
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
                user: { 
                    ...state.user,
                    id: action.payload.userID
                }
            }

        case 'Stickers/stickerReducer/SET_USER_BATCH_ACCESS':
            return {
                ...state,
                user: { 
                    ...state.user,
                    batchAccess: action.payload.batchAccess
                }
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
    setStartNumber: (startNumber: number) => ({ type: 'Stickers/stickerReducer/SET_STARTNUMBER', payload: { startNumber } } as const),
    setCopyAction: (copy: number) => ({ type: 'Stickers/stickerReducer/SET_COPY', payload: { copy } } as const),
    setCopyCountAction: (copyCount: number) => ({ type: 'Stickers/stickerReducer/SET_COPY_COUNT', payload: { copyCount } } as const),
    setRepeatStickerValue: (value: number) => ({ type: 'Stickers/stickerReducer/SET_REPEAT_STICKER_VALUE', payload: { value } } as const),
    setUserID: (userID: number) => ({ type: 'Stickers/stickerReducer/SET_USERID', payload: { userID } } as const),
    setUserBatchAccess: (batchAccess: boolean) => ({ type: 'Stickers/stickerReducer/SET_USER_BATCH_ACCESS', payload: { batchAccess } } as const),
    setLocation: (location: string) => ({ type: 'Stickers/stickerReducer/SET_LOCATION', payload: { location } } as const),
    setLPUList: (list: Array<LPUListType>) => ({ type: 'Stickers/stickerReducer/SET_LPU_LIST', payload: { list } } as const),
    setLocations: (locations: Array<LocationsListType>) => ({ type: 'Stickers/stickerReducer/SET_LOCATIONS', payload: { locations } } as const),
    setNewLocationLPU: (newLocationLPU: number) => ({ type: 'Stickers/stickerReducer/SET_NEW_LOCATION_LPU', payload: { newLocationLPU } } as const),
    setNewLocationLocation: (newLocationLocation: string) => ({ type: 'Stickers/stickerReducer/SET_NEW_LOCATION_LOCATION', payload: { newLocationLocation } } as const),
    setSelectedLocation: (location: number) => ({ type: 'Stickers/stickerReducer/SET_SELECTED_LOCATION', payload: { location } } as const),
    setFilteredLocations: (filteredLocations: Array<FilteredLocationsType>) => ({ type: 'Stickers/stickerReducer/SET_FILTERED_LOCATION', payload: { filteredLocations } } as const)
}

export const printStickersThunk = (calback: any, data: GetNumberDataType): ThunkType => {
    return async (dispatch) => {
        let response = await numberAPI.getNumber(JSON.stringify(data)).then(resp => resp.values[0][0]['number'])
        dispatch(actions.setStartNumber(response - data.copy))
        setTimeout(calback, 0)
    }
}

export const printRepeatNumberThunk = (value: number, printCalback: () => void, id: number): ThunkType => {
    return async (dispatch: AppDispatch) => {
        dispatch(actions.setStartNumber(value))
        dispatch(actions.setCopyCountAction(1))
        setTimeout(printCalback, 0)
        dispatch(actions.setRepeatStickerValue(0))
        getLocationCopyCount(id)
    }
}

export const showLocationThunk = (id: number): ThunkType => {
    return async (dispatch) => {
        let LPU = await numberAPI.getLocation(id).then(res => res.values[0][0])
        dispatch(actions.setLocation(LPU.name + ': ' + LPU.location))
        await numberAPI.getUserBatchAccess(id).then(res => {
            dispatch(actions.setUserBatchAccess(Boolean(res.values[0].batchAccess)))
        })
    }
}

export const getLPUThunk = (): ThunkType => {
    return async (dispatch) => {
        let LPU = await numberAPI.getLPU().then(res => res.values[0])
        dispatch(actions.setLPUList(LPU))
    }
}

export const getAllLocations = (): ThunkType => {
    return async (dispatch) => {
        let locations = await numberAPI.getAllLocations().then(res => res.values[0])
        dispatch(actions.setLocations(locations))
    }
}

export const insertNewLocatoin = (data: string): ThunkType => {
    return async (dispatch) => {
        await numberAPI.postNewLocation(data).then(res => {
            dispatch(getAllLocations())
        });
    }
}

export const deleteLocation = (id: number): ThunkType => {
    return async (dispatch) => {
        await numberAPI.deleteLocation(id).then(res => {
            dispatch(getAllLocations())
        })
    }
}

export const setLocationCopyCount = (copyCount: CopyCountType): ThunkType => {
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

export const getLocationCopyCount = (id: number): ThunkType => {
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

export const getFilteredLocations = (selectedLPU: number): ThunkType => {
    return async (dispatch) => {
        await numberAPI.getFilteredLocations(selectedLPU).then(res => {
            dispatch(actions.setFilteredLocations(res.values[0]))
        })
    }
}

export default stickerReducer


type initializeStateType = typeof initializeState

type ActionType = InfernActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType>

export type LocationListType = {
    lpu: number
    location: string
}
export type CopyCountType = {
    copyCount: number
    location: number
}
export type LocationsListType = {
    id: number
    lpu: number
    location: string
}
type LPUListType = {
    value: number
    label: string
}
type FilteredLocationsType = {
    value: number
    label: string
}

export type GetNumberDataType = {
    id: number
    copy: number
}