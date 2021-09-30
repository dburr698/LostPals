import { Card } from "react-bootstrap"
import { connect } from "react-redux"


function LostPetsList(props) {

    const lostPetItems = props.pets.map((pet) => {
        return <li className="petLI" key={pet.id}>
            <Card style={{ width: 250 }}>
                <img src={pet.image} alt="pet" />
                <Card.Body>
                    <h4>{pet.name}</h4>
                    <b>Breed: </b>{pet.breed}<br></br>
                    <b>Color: </b>{pet.color}<br></br>
                    <b>Gender: </b>{pet.gender}
                </Card.Body>
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
        pets: state.fetchLostPetsRed.lostPets.pet
    }
}

export default connect(mapStateToProps)(LostPetsList)