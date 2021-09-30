import * as actionType from '../actions/actionTypes'

const initialState = {
    myPets: []
}

const FetchMyPetsReducer = (state=initialState, action) => {
    switch(action.type){
        case actionType.FETCH_MY_PETS:
            return{
                ...state,
                myPets: action.payload
            }
        default:
            return state
    }
}

export default FetchMyPetsReducer