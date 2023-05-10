import {
    Action,
    compose,
    applyMiddleware,
    combineReducers, legacy_createStore as createStore
} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import appReducer from "./app-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import chatReducer from "./chat-reducer";

let rootReducer = combineReducers( {
    auth: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    app: appReducer,
    chat: chatReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T>=T extends {[keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;