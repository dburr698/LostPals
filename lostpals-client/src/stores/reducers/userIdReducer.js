import * as actionType from '../actions/actionTypes'

const initialState = {
    userID: ''
}

const UserIdReducer = (state=initialState, action) => {
    switch(action.type){
        case actionType.STORE_USER_ID:
            return{
                ...state,
                userID: action.payload
            }

        default:
            return state
    }
}

export default UserIdReducer