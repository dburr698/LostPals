import { Card } from "react-bootstrap"
import { connect } from "react-redux"


function MyPetsList(props) {

    const myPetItems = props.myPets.map((pet) => {
        return <li className="petLI" key={pet.id}>
            <Card className='petCard'>
                <Card.Img variant='top' src={pet.image} alt="pet" />
                <Card.Body>
                    <h4>{pet.name}</h4>
                    <b>Breed: </b>{pet.breed}<br></br>
                    <b>Color: </b>{pet.color}<br></br>
                    <b>Gender: </b>{pet.gender}
                </Card.Body>
                
            </Card>
        </li>
    })

    return (
        <div>
            <ul className='myPetsUL'>
                {myPetItems}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myPets: state.fetchMyPetsRed.myPets
    }
}

export default connect(mapStateToProps)(MyPetsList)