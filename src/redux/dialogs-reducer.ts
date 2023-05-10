import {InferActionsTypes} from "./redux-store";

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Dmitry'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Maria'},
        {id: 4, name: 'Nadia'},
        {id: 5, name: 'John'},
        {id: 6, name: 'Alex'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi I am a boss'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Say'},
        {id: 4, message: 'HI'},
        {id: 5, message: 'YO'},
    ] as Array<MessageType>
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case 'SN/DIALOGS/SEND_MESSAGE':
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id:6, message: body}]
            }
        default:
            return state
    }
}

export const actions = {
    sendMessage:(newMessageBody: string) => ({
        type: 'SN/DIALOGS/SEND_MESSAGE',
        newMessageBody} as const)
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>