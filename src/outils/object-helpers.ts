import {UserType} from "../redux/Users-reducer";

export const updateObjectInArray = (items: UserType[], itemId: number, objPropName: string, newObjProps: {followed: boolean}): UserType[] => {
    return items.map(u => {
        //@ts-ignore
        if (u[objPropName] === itemId) {
            return { ...u, ...newObjProps}
        } else {
            return u
        }
    })
}