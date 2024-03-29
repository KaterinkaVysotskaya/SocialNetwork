import profileReducer, {profileActions} from "./profile-reducer";
import {PostType} from "./store";
import {ProfileType} from "../components/Profile/ProfileContainer";
type initialStateType = {
    posts: Array <PostType>
    profile: ProfileType | null
    status: string
}
let state: initialStateType  = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11},
        {id: 3, message: "It's my second post", likesCount: 11},
        {id: 4, message: "It's my third post", likesCount: 11},
    ],
    profile: null as ProfileType | null,
    status: ''
}
test('lenght of posts should be increment ', () => {
    // test data
    let action = profileActions.addPostAC('it-kamasutra')
     // action
    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(5);
    expect(newState.posts[4].message).toBe('it-kamasutra');
});
test('post should be deleted ', () => {
    // test data
    let action = profileActions.deletPostAC(1)
    // action
    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(3);
    // expect(newState.posts[4].message).toBe('it-kamasutra');
});
test(`length shouldn't be decrement if id is incorrect` , () => {
    // test data
    let action = profileActions.deletPostAC(1000)
    // action
    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(4);
    // expect(newState.posts[4].message).toBe('it-kamasutra');
});