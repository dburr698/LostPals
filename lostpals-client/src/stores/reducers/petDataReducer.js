import * as actionType from '../actions/actionTypes'

const initialState = {
    petData: []
}

const PetDataReducer = (state=initialState, action) => {
    switch(action.type){
        case actionType.STORE_DATA:
            return{
                ...state,
                petData: action.payload
            }
        default:
            return state

        
    }
}

export default PetDataReducer