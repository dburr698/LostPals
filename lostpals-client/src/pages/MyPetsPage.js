import { useEffect } from "react"
import { Button, Container } from "react-bootstrap"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import MyPetsList from "../components/MyPetsList"
import * as actionCreator from '../stores/creators/actionCreators'

function MyPetsPage(props) {

    useEffect(() => {
        props.onFetchMyPets(props.userId)
    }, [])

    return (
        <div>
            <Container>
                <h1>My Pets</h1>

                <MyPetsList />

                <NavLink to='/add-pet' ><Button>Register a New Pet</Button></NavLink>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        userId: state.userRed.userID
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onFetchMyPets: (userId) => dispatch(actionCreator.fetchMyPets(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPetsPage)