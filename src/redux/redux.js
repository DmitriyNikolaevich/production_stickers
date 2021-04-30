import { applyMiddleware, combineReducers, createStore } from "redux"
import stickerReducer from "./stickerReducer"
import thunkMiddleware from "redux-thunk"

let comonReducer = combineReducers({
    stickers: stickerReducer
})

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(comonReducer, applyMiddleware(thunkMiddleware))

window.__store__ = store

export default store