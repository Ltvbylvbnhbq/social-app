import {APIResponseType, instance, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";
import {ValueObjLoginType} from "../redux/auth-reducer";

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
            .then(res => res.data)
    },
    login(values:ValueObjLoginType) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, values)
            .then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}