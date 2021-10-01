import * as actionType from '../actions/actionTypes'

const initialState = {
    isLoggedIn: false
}

const isLoggedInReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionType.IS_LOGGED_IN:
            return{
                ...state,
                isLoggedIn: action.payload
            }
        case actionType.IS_LOGGED_OUT:
            return{
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state
    }
}

export default isLoggedInReducer