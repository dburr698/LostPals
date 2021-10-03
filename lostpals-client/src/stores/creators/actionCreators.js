import * as actionType from '../actions/actionTypes'

export const storeUserId = (userId) => {
    return {
        type: actionType.STORE_USER_ID,
        payload: userId
    }
}

export const fetchMyPets = (userId) => {
    const token = localStorage.getItem('jsonwebtoken')
    return async (dispatch) => {
        let response = await fetch(`http://localhost:8080/api/${userId}/my-pets-info`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        let myPets = await response.json()
        dispatch({
            type: actionType.FETCH_MY_PETS,
            payload: myPets
        })
    }
}

export const fetchComments = (lostPetId) => {
    return async (dispatch) => {
        let response = await fetch(`http://localhost:8080/api/${lostPetId}/get-comments`)
        let comments = await response.json()
        dispatch({
            type: actionType.FETCH_COMMENTS,
            payload: comments
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

export const isLoggedIn = () => {
    return {
        type: actionType.IS_LOGGED_IN,
        payload: true
    }
}

export const isLoggedOut = () => {
    return {
        type: actionType.IS_LOGGED_OUT,
        payload: false
    }
}