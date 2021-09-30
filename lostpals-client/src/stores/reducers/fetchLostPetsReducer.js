import * as actionType from '../actions/actionTypes'

const initialState = {
    lostPets: []
}

const FetchLostPetsReducer = (state=initialState, action) => {
    switch(action.type){
        case actionType.FETCH_LOST_PETS:
            return{
                ...state,
                lostPets: action.payload
            }
        default:
            return state
    }
}

export default FetchLostPetsReducer