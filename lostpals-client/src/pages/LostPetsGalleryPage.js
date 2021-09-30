import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { connect } from "react-redux"
import LostPetsList from "../components/LostPetsList"
import * as actionCreator from '../stores/creators/actionCreators'

function LostPetsGalleryPage(props) {

    useEffect(() => {
        props.onFetchLostPets()
    }, [])

    return(
        <div>
            <Container>
            <h1>Lost Pets</h1>
            <LostPetsList />

            </Container>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        onFetchLostPets: () => dispatch(actionCreator.fetchLostPets())
    }
}

export default connect(null, mapDispatchToProps)(LostPetsGalleryPage)