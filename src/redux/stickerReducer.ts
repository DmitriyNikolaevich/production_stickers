import { numberAPIgetNumberResponseType, numberAPIgetCopyCountForLocationResponseType, numberAPIgetLocationResponseType, 
    numberAPIgetUserBatchAccessResponseType, numberAPIgetLPUResponseType, numberAPIgetAllLocationsResponseType, 
    numberAPIgetFilteredLocationsResponseType, numberAPIgetLocationCopyCountResponseType, numberAPIdeleteLocationResponseType,
    numberAPIpostNewLocationResponseType } from './../API/numberAPI';
import { InfernActionTypes } from './redux';
import { numberAPI } from "../API/numberAPI"
import {put, call, takeEvery, StrictEffect} from 'redux-saga/effects'

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

const stickerReducer = (state:initializeStateType = initializeState, action: ActionType): initializeStateType => {
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
    setFilteredLocations: (filteredLocations: Array<FilteredLocationsType>) => ({ type: 'Stickers/stickerReducer/SET_FILTERED_LOCATION', payload: { filteredLocations } } as const),

    //SAGAs AC

    printStickersSagasAC: (calback: () => void, data: GetNumberDataType) => ({ type:'Stickers/stickerReducer/PRIN_STIKERS_SAGA', payload: { calback, data } } as const),
    printRepeatNumberSagsaAC: (value: number, printCalback: () => void, id: number) => ({ type: 'Stickers/stickerReducer/PRINT_REPEAT_STICKERS_SAGA', payload: { value, printCalback, id } } as const),
    getLocationCopyCountSagasAC: (id: number) => ({ type: 'Stickers/stickerReducer/GET_LOCATION_COPY_COUNT_SAGA', payload: { id } } as const),
    showLocationSagasAC: (id: number) => ({ type: 'Stickers/stickerReducer/SHOW_LOCATION_SAGA', payload: { id } } as const),
    getLPUSagsaAC: () => ({ type: 'Stickers/stickerReducer/GET_LPU_SAGA' } as const),
    getAllLocationsSagsaAC: () => ({ type: 'Stickers/stickerReducer/GET_ALL_LOCATIONS_SAGA' } as const),
    insertNewLocatoinSagsaAC: (data: string) => ({ type: 'Stickers/stickerReducer/INSERT_NEW_LOCATION_SAGA', payload: { data } } as const),
    deleteLocationSagsaAC: (id: number) => ({ type: 'Stickers/stickerReducer/DELETE_LOCATION_SAGA', payload: { id } } as const),
    setLocationCopyCountSagsaAC: (copyCount: CopyCountType) => ({ type: 'Stickers/stickerReducer/SET_LOCATION_COPY_COUNT_SAGA', payload: { copyCount } } as const),
    getFilteredLocationsSagsaAC: (selectedLPU: number) => ({ type: 'Stickers/stickerReducer/GET_FILTERED_LOCATIONS_SAGA', payload: { selectedLPU } } as const),
    setLocationCopyCountSagasAC: (copyCount: CopyCountType) => ({ type: 'Stickers/stickerReducer/SET_LOCATION_COPY_COUNT_SAGA', payload: { copyCount }} as const)
}



//SAGAs



export function* printStickersSAGA(action: printStickersSAGAactionType): Generator<StrictEffect, void, numberAPIgetNumberResponseType> {
    try {
        let response: numberAPIgetNumberResponseType = yield call(numberAPI.getNumber, JSON.stringify(action.payload.data))
        yield put(actions.setStartNumber(response.values - action.payload.data.copy))
        setTimeout(action.payload.calback, 0)
    } catch(error) {
        console.log(error)
    }
}

export function* printRepeatNumberSAGA(action: printRepeatNumberSAGAactionType): Generator<StrictEffect, void, any> {
    try {
            yield put(actions.setStartNumber(action.payload.value))
            yield put(actions.setCopyCountAction(1))
            setTimeout(action.payload.printCalback, 0)
            yield put(actions.setRepeatStickerValue(0))
            yield put(actions.getLocationCopyCountSagasAC(action.payload.id))
    } catch(error) {
        console.log(error)
        
    }
}

export function* getLocationCopyCountSAGA(action: getLocationCopyCountSAGAactionType): Generator<StrictEffect, void, numberAPIgetCopyCountForLocationResponseType> {
    try {
        const response: numberAPIgetCopyCountForLocationResponseType = yield call(numberAPI.getCopyCountForLocation, action.payload.id)
            if (response.status === 200) {
                yield put(actions.setCopyCountAction(response.values))
            } else {
                throw new Error()
            }
    } catch (error) {
        console.log(error)
    }
}

export function* showLocationSAGA(action: showLocationSAGAactionType): Generator<StrictEffect, void, any> {
    try {
        const LPU: numberAPIgetLocationResponseType = yield call(numberAPI.getLocation, action.payload.id)
        yield put(actions.setLocation(LPU.values.name + ': ' + LPU.values.location))
        const response: numberAPIgetUserBatchAccessResponseType = yield call(numberAPI.getUserBatchAccess, action.payload.id)
        yield put(actions.setUserBatchAccess(Boolean(response.values)))
    } catch (error) {
        console.log(error)
    }
}

export function* getLPUSAGA(): Generator<StrictEffect, void, numberAPIgetLPUResponseType> {
    try {
        let LPU: numberAPIgetLPUResponseType = yield call(numberAPI.getLPU)
        yield put(actions.setLPUList(LPU.values))
    } catch (error) {
        console.log(error)
    }
}

export function* getAllLocationsSAGA(): Generator<StrictEffect, void, numberAPIgetAllLocationsResponseType> {
    try {
        let locations: numberAPIgetAllLocationsResponseType = yield call(numberAPI.getAllLocations)
        yield put(actions.setLocations(locations.values))
    } catch (error) {
        console.log(error)
    }
}

export function* insertNewLocatoinSAGA(action: insertNewLocatoinSAGAactionType): Generator<StrictEffect, void, numberAPIpostNewLocationResponseType> {
    try {
        const response =  yield call(numberAPI.postNewLocation, action.payload.data)
        if (Boolean(response.values)) {
            yield put(actions.getAllLocationsSagsaAC())
        } else {
            throw new Error('Локация не добавленна!')
        }
    } catch (error) {
        
    }
}

export function* deleteLocationSAGA(action: deleteLocationSAGAactionType): Generator<StrictEffect, void, numberAPIdeleteLocationResponseType> {
    try {
        const response = yield call(numberAPI.deleteLocation, action.payload.id)
        if (Boolean(response.values)) {
            yield put(actions.getAllLocationsSagsaAC())   
        } else {
            throw new Error('Локация не удалена!')
        }
    } catch (error) {
        console.log(error)
    }
}

export function* getFilteredLocationsSAGA(action: getFilteredLocationsSAGAactionType): Generator<StrictEffect, void, numberAPIgetFilteredLocationsResponseType> {
    try {
        const response: numberAPIgetFilteredLocationsResponseType = yield call(numberAPI.getFilteredLocations, action.payload.selectedLPU)
        yield put(actions.setFilteredLocations(response.values))
    } catch (error) {
        console.log(error)
    }
}

export function* setLocationCopyCountSAGA(action: setLocationCopyCountSAGAactionType): Generator<StrictEffect, void, numberAPIgetLocationCopyCountResponseType> {
    try {
        const response = yield call(numberAPI.getLocationCopyCount, JSON.stringify(action.payload.copyCount))
            if (response.status === 200) {
                yield put(actions.setCopyCountAction(action.payload.copyCount.copyCount))
            } else {
                throw new Error()
            }
    } catch (error) {
        console.log(error)
    }
}



//runing SAGA



export function* stickerReducerSAGA() {
    yield takeEvery('Stickers/stickerReducer/PRIN_STIKERS_SAGA', printStickersSAGA)
    yield takeEvery('Stickers/stickerReducer/PRINT_REPEAT_STICKERS_SAGA', printRepeatNumberSAGA)
    yield takeEvery('Stickers/stickerReducer/GET_LOCATION_COPY_COUNT_SAGA', getLocationCopyCountSAGA)
    yield takeEvery('Stickers/stickerReducer/SHOW_LOCATION_SAGA', showLocationSAGA)
    yield takeEvery('Stickers/stickerReducer/GET_LPU_SAGA', getLPUSAGA)
    yield takeEvery('Stickers/stickerReducer/GET_ALL_LOCATIONS_SAGA', getAllLocationsSAGA)
    yield takeEvery('Stickers/stickerReducer/INSERT_NEW_LOCATION_SAGA', insertNewLocatoinSAGA)
    yield takeEvery('Stickers/stickerReducer/DELETE_LOCATION_SAGA', deleteLocationSAGA)
    yield takeEvery('Stickers/stickerReducer/GET_FILTERED_LOCATIONS_SAGA', getFilteredLocationsSAGA)
    yield takeEvery('Stickers/stickerReducer/SET_LOCATION_COPY_COUNT_SAGA', setLocationCopyCountSAGA)
}

export default stickerReducer


export type initializeStateType = typeof initializeState

type ActionType = InfernActionTypes<typeof actions>

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
export type LPUListType = {
    value: number
    label: string
}
export type FilteredLocationsType = {
    value: number
    label: string
}

export type GetNumberDataType = {
    id: number
    copy: number
}
export type printStickersSAGAactionType = {
    type: string
    payload: {
        calback: () => void
        data: GetNumberDataType
    }
}
export type printRepeatNumberSAGAactionType = {
    type: string
    payload: {
        printCalback: () => void
        value: number
        id: number
    }
}
export type getLocationCopyCountSAGAactionType = {
    type: string
    payload: {
        id: number
    }
}
export type showLocationSAGAactionType = {
    type: string
    payload: {
        id: number
    }
}
export type deleteLocationSAGAactionType = {
    type: string
    payload: {
        id: number
    }
}
export type insertNewLocatoinSAGAactionType = {
    type: string
    payload: {
        data: string
    }
}
export type getFilteredLocationsSAGAactionType = {
    type: string
    payload: {
        selectedLPU: number
    }
}
export type setLocationCopyCountSAGAactionType = {
    type: string
    payload: {
        copyCount: CopyCountType
    }
}