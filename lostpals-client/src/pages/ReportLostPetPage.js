import { useState } from "react"
import { Button, Card, Container } from "react-bootstrap"
import { connect } from "react-redux"
import LostPetForm from "../components/LostPetForm"


function ReportLostPetPage(props) {

    const [showForm, setShowForm] = useState(false)

    const handleLostButton = () => {
        setShowForm(!showForm)
    }

    const myPetItems = props.myPets.map((pet) => {
        return <li className="petLI" key={pet.id}>
            <Card style={{ width: 250 }}>
                <Card.Img variant='top' src={pet.image} />
                <Card.Body>
                    <h4>{pet.name}</h4>
                    <b>Breed: </b>{pet.breed}<br></br>
                    <b>Color: </b>{pet.color}<br></br>
                    <b>Gender: </b>{pet.gender}
                </Card.Body>
                <Button variant='danger' onClick={handleLostButton} >Help! I'm Lost!</Button>
            </Card>

            {showForm ? <LostPetForm petId={pet.id} /> : null}
        </li>
    })


    return(
        <div>
            <Container>
            <h1>Report Lost Pet</h1>

            <ul className="myPetsUL">
                <h3>Which pet is missing?</h3>
                {myPetItems}
            </ul>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        myPets: state.fetchMyPetsRed.myPets
    }
}

export default connect(mapStateToProps)(ReportLostPetPage)