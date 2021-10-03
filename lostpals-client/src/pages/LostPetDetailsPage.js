import { useState } from "react"
import { Col, Container, Row, Form, Button, NavLink, Alert } from "react-bootstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import CommentsList from "../components/commentsList"
import * as actionCreator from '../stores/creators/actionCreators'


function LostPetDetailsPage(props) {

    const [comment, setComment] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const lostAt = new Date(props.petData.date_lost)
    const dateLost = lostAt.toLocaleDateString('en-US')

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }

    const handleAddCommentButton = () => {
        const body = {
            userId: props.userId,
            lostPetId: props.petData.id,
            message: comment
        }

        fetch('https://lost-pals.herokuapp.com/api/add-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    props.onFetchComments(props.petData.id)
                    setComment('')
                } else {
                    setErrorMessage(result.message)
                }
            })
    }

    return (
        <div>
            <Container>
                <h1>Pet Details</h1>
                <Row className='lostPet-details'>
                    <Col className='pet-img-div'>
                        <img src={props.petData.pet.image} alt="Pet Picture" className='lostPet-image'/>
                    </Col>
                    <Col className='lostPet-info'>
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

                <Row className='mt-5'>
                    <h2>Have You Seen This Pet?</h2>
                    {props.isLoggedIn ?
                        <div className='comment-box' >

                            <Form.Control className='comment-text' type='text' onChange={handleCommentChange} />

                            <Button className='comment-button' onClick={handleAddCommentButton}>Comment</Button>

                            {errorMessage && <Alert variant='danger' >{errorMessage}</Alert>}
                        </div>
                        : <Link to='/login' ><Button className='login-message-button'>Please Log In to Leave a Message</Button></Link>}
                </Row>


                <CommentsList />


            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        petData: state.petDataRed.petData,
        isLoggedIn: state.loggedInRed.isLoggedIn,
        userId: state.userRed.userID,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchComments: (lostPetId) => dispatch(actionCreator.fetchComments(lostPetId))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LostPetDetailsPage)