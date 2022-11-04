import usersReducer, {initialStateType, usersActions} from "./Users-reducer";

let state: initialStateType
beforeEach(()=>{
    state = {
        users: [
            {id: 0, followed: false, location:{city: '', country: ''},
                name: 'Kate', photos: {small: '', large: ''}, status: ''},
            {id: 1, followed: false, location:{city: '', country: ''},
                name: 'Denis', photos: {small: '', large: ''}, status: ''},
            {id: 2, followed: true, location:{city: '', country: ''},
                name: 'Sacha', photos: {small: '', large: ''}, status: ''},
            {id: 3, followed: true, location:{city: '', country: ''},
                name: 'Eugene', photos: {small: '', large: ''}, status: ''},
        ] ,
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []

    }
})
test ('follow success',()=>{
    const newState = usersReducer(state, usersActions.followSuccessAC(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test ('unfollow success',()=>{
    const newState = usersReducer(state, usersActions.unfollowSuccessAC(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})