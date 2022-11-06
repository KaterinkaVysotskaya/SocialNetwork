import React, {useEffect} from 'react'
import {FilterType, getUsers, follow, unfollow} from '../../redux/Users-reducer'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm/UsersSearchForm";
import {useAppSelector} from "../../redux/redux-store";
import {useDispatch} from "react-redux";
import {createSearchParams, useLocation, useNavigate} from "react-router-dom";

type QueryParamsType = {
    page?: string
    count?: string
    term?: string
    friend?: string
}
export const Users = React.memo(( ) => {

    const users = useAppSelector(state=>state.usersPage.users)
    const pageSize = useAppSelector(state=>state.usersPage.pageSize)
    const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
    const currentPage = useAppSelector(state => state.usersPage.currentPage)
    const followingInProgress = useAppSelector(state => state.usersPage.followingInProgress)
    const filter = useAppSelector(state => state.usersPage.filter)

    const dispatch = useDispatch()

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const _follow = (userId: number) =>{
       dispatch(follow(userId))
    }
    const _unfollow = (userId: number) =>{
        dispatch(unfollow(userId))
    }
    const useNavigateSearch = () => {
        const navigate = useNavigate();
        return (pathname: string, params: QueryParamsType) =>
            navigate(`${pathname}?${createSearchParams(params)}`);
    };

    const navigateSearch = useNavigateSearch();
    const location = useLocation();

    useEffect(()=>{
        const query = new URLSearchParams(location.search);

        let actualPage = currentPage;
        let actualFilter = filter;

        const queryFriend = query.get("friend");
        const queryPage = query.get("page");
        const queryTerm = query.get("term");

        if (queryPage) actualPage = +queryPage;
        if (queryTerm) actualFilter = { ...actualFilter, term: queryTerm };

        switch (queryFriend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null };
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true };
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false };
                break;
            default:
                break;
        }

      dispatch( getUsers(actualPage, pageSize, actualFilter))
    },[])
    useEffect(() => {
        const query: QueryParamsType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !==1) query.page = String(currentPage)
        if(!!filter.term) query.term = filter.term

        navigateSearch("/users", query);

    }, [filter, currentPage, pageSize]);
    return (
            <div>
                <div>
                    <Paginator pageSize={pageSize}
                               totalItemsCount={totalUsersCount}
                               currentPage={currentPage}
                               onPageChanged={onPageChanged}
                                />
                    <UsersSearchForm onFilterChanged={onFilterChanged} />
                </div>
                {users.map(u =><User key={u.id}
                                    user={u}
                                    follow={_follow}
                                    followingInProgress={followingInProgress}
                                    unfollow={_unfollow}

                /> )}

            </div>
    )
})
