import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount, getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import queryString from "query-string";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {UsersSearchForm} from "./UserSearchForm";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {useLocation, useNavigate} from "react-router-dom";

type PropsType = {}

type QueryParamsType = {
    term?: string,
    page?: string,
    friend?: string
}

export const Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const parsed = queryString.parse(location.search.substring(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            pathname: '/developers',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const followTransit = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowTransit = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>

        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}/>
        <div>
            {users.map(u =>
                <User user={u}
                      followingInProgress={followingInProgress}
                      key={u.id}
                      unfollow={unfollowTransit}
                      follow={followTransit}
                />)}
        </div>
    </div>
}