import { useState } from "react"
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap"
import { connect } from "react-redux"
import * as actionCreator from '../stores/creators/actionCreators'
import axios from 'axios'


function AddPetPage(props) {

    const [pet, setPet] = useState({})
    const [file, setFile] = useState()
    const [showFile, setShowFile] = useState({})
    

    const handlePetChange = (e) => {
        setPet({
            ...pet,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setShowFile({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

    const handleAddPetButton = async () => {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('name', pet.name)
        formData.append('gender', pet.gender)
        formData.append('breed', pet.breed)
        formData.append('color', pet.color)
        formData.append('is_chipped', pet.is_chipped)
        formData.append('chip_id', pet.chip_id)
        formData.append('user_id', props.userId)
        
        

        const result = await axios.post('https://lost-pals.herokuapp.com/api/add-pet', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        if (result.data.success) {
            props.onFetchMyPets(props.userId)
            props.history.push('/my-pets')
        }

    }




    return (
        <div>
            <Container className='mb-4'>
                <h1>Register a New Pet</h1>

                <Row>

                    <Form.Group className='mb-3'>
                        <Form.Label>Photo: </Form.Label>
                        <Form.Control type="file" name="file" onChange={handleFileChange} />
                    </Form.Group>

                    <Col>
                        <img src={showFile.file} width='200px' />
                    </Col>

                </Row>

                <Form.Group className='mb-3'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type='text' name='name' onChange={handlePetChange} placeholder="Enter Pet's Name" required />
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
                    <Form.Label>Gender: </Form.Label>
                    <select className='m-2' name='gender' onChange={handlePetChange}>
                        <option> - </option>
                        <option value='Male' >Male</option>
                        <option value='Female'>Female</option>
                    </select>
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
    return {
        onFetchMyPets: (userId) => dispatch(actionCreator.fetchMyPets(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPetPage)