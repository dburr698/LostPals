import * as actionType from '../actions/actionTypes'

export const storeUserId = (userId) => {
    return {
        type: actionType.STORE_USER_ID,
        payload: userId
    }
}