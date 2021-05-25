import { Action, applyMiddleware, combineReducers, createStore } from "redux"
import stickerReducer, { stickerReducerSAGA } from "./stickerReducer"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
// import { useDispatch } from "react-redux"
import createSagaMiddleware from 'redux-saga'

let comonReducer = combineReducers({
    stickers: stickerReducer
})

export const sagaMiddleware = createSagaMiddleware()

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(comonReducer, applyMiddleware(thunkMiddleware, sagaMiddleware))
sagaMiddleware.run(stickerReducerSAGA)

//@ts-ignore
window.__store__ = store

export default store


type RootReducerType = typeof comonReducer
export type AppStateType = ReturnType<RootReducerType>

type ProppertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InfernActionTypes<T extends {[key: string]: (...arg: any[]) => any}> = ReturnType<ProppertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()