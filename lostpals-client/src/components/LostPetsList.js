import { Button, Card } from "react-bootstrap"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import * as actionCreator from '../stores/creators/actionCreators'


function LostPetsList(props) {

    const handleDetailsButton = (pet) => {
        props.onStorePetData(pet)
        props.onFetchComments(pet.id)
    }

    
    const lostPetItems = props.lostPets.map((lostPet) => {
        return <li className="petLI" key={lostPet.id}>
            <Card style={{ width: 250 }}>
                <img src={lostPet.pet.image} alt="pet" />
                <Card.Body>
                    <h4>{lostPet.pet.name}</h4>
                    <b>Breed: </b>{lostPet.pet.breed}<br></br>
                    <b>Color: </b>{lostPet.pet.color}<br></br>
                    <b>Gender: </b>{lostPet.pet.gender}
                </Card.Body>
                <NavLink to='/lost-pet-details'><Button variant='primary' onClick={() => handleDetailsButton(lostPet)}>More Details</Button></NavLink>
            </Card>
        </li>
    })
    

    return(
        <div>
            <ul className="lostPetsUL">
                {lostPetItems}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        lostPets: state.fetchLostPetsRed.lostPets
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onStorePetData: (pet) => dispatch(actionCreator.storePetData(pet)),
        onFetchComments: (lostPetId) => dispatch(actionCreator.fetchComments(lostPetId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LostPetsList)