import React, {useEffect} from 'react'
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import './Profile.module.css';
import {WithRouteComponentProps, withRouter} from "../../hoc/withRouter";
import Profile from "./Profile";
import {Navigate} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {withNavigate} from "../../hoc/withNavigate";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & WithRouteComponentProps<PathParamsType>

const ProfileContainer: React.FC<PropsType> = (props) => {


    const refreshProfile = () => {
        let userId: number | null = +props.router.params.userId
        if (!userId) {
            userId = props.authorizedUserId
        }

        if(!userId) {
            console.error("Id should exists in URI params or in state ('authorizedUserId')")
        } else {
            props.getUserProfile(userId)
            props.getStatus(userId)
        }
    }

    useEffect(() => {
    refreshProfile()
    return () => {
    console.log('UpdateProfile')
    }
    }, [props.router.params.userId])

    if (!props.isAuth && !props.router.params.userId) {
        return <Navigate to={'/login'} />
    }

    return (
        <Profile {...props}
            isOwner={!props.router.params.userId}
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
            savePhoto={props.savePhoto} />
    )
}

let mapStateToProps = (state: AppStateType) => {
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withNavigate,
    withRouter
)
(ProfileContainer)

