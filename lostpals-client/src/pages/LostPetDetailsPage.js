import { Col, Container, Row } from "react-bootstrap"
import { connect } from "react-redux"


function LostPetDetailsPage(props) {

    console.log(props.petData)
    console.log(props.petData.pet)

    const lostAt = new Date(props.petData.date_lost)
    const dateLost = lostAt.toLocaleDateString('en-US')

    return (
        <div>
            <Container>
                <h1>Pet Details</h1>
                <Row>
                    <Col>
                        <img src={props.petData.pet.image} alt="Pet Picture" style={{ width: 300 }} />
                    </Col>
                    <Col>
                        <div className='pet-info'>
                            <b>Name: </b>{props.petData.pet.name}
                        </div>
                        <div className='pet-info'>
                            <b>Gender: </b>{props.petData.pet.gender}
                        </div>
                        <div className='pet-info'>
                            <b>Breed: </b>{props.petData.pet.breed}
                        </div>
                        <div className='pet-info'>
                            <b>Color: </b>{props.petData.pet.color}
                        </div>
                        <div className='pet-info'> 
                            <b>Date Lost: </b>{dateLost}
                        </div>
                        <div className='pet-info'>
                            <b>Zipcode: </b>{props.petData.zipcode}
                        </div>
                        <div className='pet-info'>
                            <b>Circumstances: </b>
                            <div>{props.petData.circumstance}</div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        petData: state.petDataRed.petData
    }
}

export default connect(mapStateToProps)(LostPetDetailsPage)