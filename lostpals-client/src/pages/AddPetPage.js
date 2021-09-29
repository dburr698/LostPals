import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"


function AddPetPage() {

    const [pet, setPet] = useState({})
    const [file, setFile] = useState('')

    const handlePetChange = (e) => {
        setPet({
            ...pet,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        setFile({
            [e.target.name]: e.target.files[0]
        })
    }

    const handleUploadButton = () => {
        const formData = new FormData()
        formData.append('file', file)
        fetch('http://localhost:8080/api/upload', {
            method:'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        }).then(response => response.json())
        .then(result => {
            console.log(result)
        }).catch(error => {
            console.error(error)
        })
    }

    const handleAddPetButton = () => {
        console.log('Not yet functional')
    }
    

    

    return (
        <div>
            <Container>
                <h1>Register a New Pet</h1>

                
                    <Form.Group className='mb-3'>
                        <Form.Label>Photo: </Form.Label>
                        <Form.Control type="file" name="image" onChange={handleFileChange} />
                    </Form.Group>
                    <Button type='submit' onClick={handleUploadButton} >Upload</Button>
                

               
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

export default AddPetPage