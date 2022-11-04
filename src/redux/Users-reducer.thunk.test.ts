import {follow, unfollow, usersActions} from "./Users-reducer";
import {usersAPI} from "../api/usersAPI";
jest.mock('../api/usersAPI')

import {BaseResponseType} from '../api/api'
import {AxiosResponse} from "axios";
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(()=>{
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unfollow.mockClear()
})
const result: BaseResponseType = {
    resultCode: 0,
    messages: [],
    data: {}
}

test('success follow thunk',async ()=>{
    const thunk = follow(1)
    userAPIMock.follow.mockResolvedValue(Promise.resolve(result))


    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)

    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.followSuccessAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgressAC(false, 1))

})
test('success unfollow thunk',async ()=>{
    const thunk = unfollow(1)
    userAPIMock.unfollow.mockResolvedValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)

    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unfollowSuccessAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgressAC(false, 1))

})