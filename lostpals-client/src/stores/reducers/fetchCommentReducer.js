import * as actionType from '../actions/actionTypes'

const initialState = {
    comments: []
}

const FetchCommentsReducer = (state=initialState, action) => {
    switch(action.type){
        case actionType.FETCH_COMMENTS:
            return{
                ...state,
                comments: action.payload
            }
        default:
            return state
    }
}

export default FetchCommentsReducer