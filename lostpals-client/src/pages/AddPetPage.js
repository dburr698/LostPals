import { useState } from "react"
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap"
import { connect } from "react-redux"
import * as actionCreator from '../stores/creators/actionCreators'


function AddPetPage(props) {

    const [pet, setPet] = useState({})
    const [file, setFile] = useState('')
    const [showFile, setShowFile] = useState({})
    const [message, setMessage] = useState('')

    const handlePetChange = (e) => {
        setPet({
            ...pet,
            [e.target.name]: e.target.value,
        })
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setShowFile({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

    const handleUploadButton = () => {
        const formData = new FormData()
        formData.append('file', file)
        fetch('http://localhost:8080/api/upload', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    setMessage(result.message)
                }
            }).catch(error => {
                console.error(error)
            })
    }

    const handleAddPetButton = () => {
        const body = {
            name: pet.name,
            gender: pet.gender,
            breed: pet.breed,
            color: pet.color,
            is_chipped: pet.is_chipped,
            chip_id: pet.chip_id,
            user_id: props.userId
        }

        console.log(body)

        fetch('http://localhost:8080/api/add-pet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    props.onFetchMyPets(props.userId)
                    props.history.push('/my-pets')
                }
            }).catch(error => {
                console.error(error)
            })
    }




    return (
        <div>
            <Container>
                <h1>Register a New Pet</h1>

                <Row>
                    <Col>
                        <Form.Group className='mb-3'>
                            <Form.Label>Photo: </Form.Label>
                            <Form.Control type="file" name="file" onChange={handleFileChange} />
                        </Form.Group>
                        <Form.Group>
                            {message && <Alert variant='success'>{message}</Alert>}
                        </Form.Group>
                        <Button type='submit' onClick={handleUploadButton} >Upload</Button>

                    </Col>
                    <Col>
                        <img src={showFile.file} width='200px' />
                    </Col>

                </Row>

                <Form.Group className='mb-3'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type='text' name='name' onChange={handlePetChange} placeholder="Enter Pet's Name" required />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Gender: </Form.Label>
                    <Form.Control type='text' name='gender' onChange={handlePetChange} placeholder="Enter Pet's Gender" required />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Breed: </Form.Label>
                    <Form.Control type='text' name='breed' onChange={handlePetChange} placeholder="Enter Breed" />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Color: </Form.Label>
                    <Form.Control type='text' name='color' onChange={handlePetChange} placeholder="Primary Fur Colors" />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Pet has Chip: </Form.Label>
                    <select className='m-2' name='is_chipped' onChange={handlePetChange}>
                        <option> - </option>
                        <option value={true} >Yes</option>
                        <option value={false}>No</option>
                    </select>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Chip Id: </Form.Label>
                    <Form.Control type='text' name='chip_id' onChange={handlePetChange} placeholder="Enter Chip ID If Available" />
                </Form.Group>
                <Button type="submit" onClick={handleAddPetButton} >Add Pet</Button>

            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userRed.userID
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onFetchMyPets: (userId) => dispatch(actionCreator.fetchMyPets(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPetPage)