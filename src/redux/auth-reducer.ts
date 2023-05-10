import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
        case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl:string) => ({
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export type ValueObjLoginType = {
    email: string,
    password: string,
    rememberMe: boolean,
    general: string,
    captcha: null | string
}

export const login = (values: ValueObjLoginType, setStatus: any, setFieldValue: any,
                      setSubmitting: any): ThunkType => async (dispatch) => {

    let data = await authAPI.login(values)

    let resultCode = data.resultCode

    if (data.resultCode === ResultCodeEnum.Success) {
        await dispatch(getAuthUserData())

    } else {
        let textError = `resultCode: ${resultCode} - another mistake`

        if (data.messages && data.messages.length) {
            textError = `resultCode: ${resultCode} - ${data.messages.join()}`
        }

        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
            textError = `enter symbols from the picture`
        }

        setStatus(textError)
        setSubmitting(false)
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = ():ThunkType => async (dispatch:any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>