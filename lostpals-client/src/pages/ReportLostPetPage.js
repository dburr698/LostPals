import { useState } from "react"
import { Button, Card, Container } from "react-bootstrap"
import { connect } from "react-redux"
import { HashLink as Link } from "react-router-hash-link"
import LostPetForm from "../components/LostPetForm"


function ReportLostPetPage(props) {

    const [showForm, setShowForm] = useState(false)
    const [petId, setPetId] = useState('')

    const handleLostButton = (petId) => {
        setPetId(petId)
        setShowForm(!showForm)
    }

    const myPetItems = props.myPets.map((pet) => {
        return <li className="petLI" key={pet.id}>
            <Card className='petCard'>
                <Card.Img variant='top' src={pet.image} />
                <Card.Body>
                    <h4>{pet.name}</h4>
                    <b>Breed: </b>{pet.breed}<br></br>
                    <b>Color: </b>{pet.color}<br></br>
                    <b>Gender: </b>{pet.gender}
                </Card.Body>
                <Link to="/report-lost-pet#lostPet-form" ><Button variant='danger' className="lostPet-button" onClick={() => handleLostButton(pet.id)} >Help! I'm Lost!</Button></Link>
            </Card>
        </li>
    })


    return (
        <div>
            <Container>
                <h1>Report Lost Pet</h1>
                <h3>Which pet is missing?</h3>

                <ul className="myPetsUL">

                    {myPetItems}

                </ul>
                <div id='lostPet-form'>
                    {showForm ? <LostPetForm  petId = {petId}/> : null}
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myPets: state.fetchMyPetsRed.myPets
    }
}



export default connect(mapStateToProps)(ReportLostPetPage)