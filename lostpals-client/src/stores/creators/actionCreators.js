import * as actionType from '../actions/actionTypes'

export const storeUserId = (userId) => {
    return {
        type: actionType.STORE_USER_ID,
        payload: userId
    }
}

export const fetchMyPets = (userId) => {
    return async (dispatch) => {
        let response = await fetch(`http://localhost:8080/api/${userId}/my-pets-info`)
        let myPets = await response.json()
        dispatch({
            type: actionType.FETCH_MY_PETS,
            payload: myPets
        })
    }
}

export const fetchLostPets = () => {
    return async (dispatch) => {
        let response = await fetch('http://localhost:8080/api/lost-pets')
        let lostPets = await response.json()
        dispatch({
            type: actionType.FETCH_LOST_PETS,
            payload: lostPets
        })
    }
}

export const storePetData = (petData) => {
    return {
        type: actionType.STORE_DATA,
        payload: petData
    }
}