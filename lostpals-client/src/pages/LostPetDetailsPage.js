import { Col, Container, Row } from "react-bootstrap"
import { connect } from "react-redux"


function LostPetDetailsPage(props) {

    console.log(props.petData)
    console.log(props.petData.pet)

    return(
        <div>
            <Container>
            <h1>Pet Details</h1>
            <Row>
                <Col>
                    <img src={props.petData.pet.image} alt="Pet Picture" style={{width: 300}} />
                </Col>
                <Col>
                    <b>Name: </b>{props.petData.pet.name} <br></br>
                    <b>Gender: </b>{props.petData.pet.gender} <br></br>
                    <b>Breed: </b>{props.petData.pet.breed} <br></br>
                    <b>Color: </b>{props.petData.pet.color} <br></br>
                </Col>
            </Row>
            <Row>
                <h4>Date Lost: </h4><p>{props.petData.date_lost}</p>
                <h4>Zipcode: </h4><p>{props.petData.zipcode}</p>
                <h4>Circumstances: </h4><p>{props.petData.circumstance}</p>
            </Row>

            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        petData: state.petDataRed.petData
    }
}

export default connect(mapStateToProps)(LostPetDetailsPage)