import { useState } from "react"
import { Alert, Button, Container, Form } from "react-bootstrap"

function LostPetForm(props) {

    const [lostPet, setLostPet] = useState({ petId: props.petId })
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleLostPetChange = (e) => {
        setLostPet({
            ...lostPet,
            [e.target.name]: e.target.value
        })
    }

    const handleReportPetButton = () => {

        fetch('https://polar-escarpment-56034.herokuapp.com/api/report-lost-pet', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lostPet)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    setMessage(result.message)
                } else {
                    setErrorMessage(result.message)
                }
            })

    }

    return (
        <div>
            <Container>
                <h1>Lost Pet Form</h1>

                <Form.Group className="mb-3">
                    <Form.Label>Date Lost: </Form.Label>
                    <Form.Control type='date' name='dateLost' onChange={handleLostPetChange} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Zipcode: </Form.Label>
                    <Form.Control type='text' name='zipcode' onChange={handleLostPetChange} placeholder="Enter zipcode where your pet went missing" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Circumstances: </Form.Label>
                    <Form.Control as="textarea" rows={3} type='text' name='circumstance' onChange={handleLostPetChange} placeholder="Please describe how, when, and where your pet was lost..." />
                </Form.Group>
                <Button variant='primary' onClick={handleReportPetButton}>Report Missing Pet</Button>
                <Form.Group className='mb-3' >
                    {message && <Alert variant='success'>{message}</Alert>}
                    {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                </Form.Group>

            </Container>
        </div>
    )
}

export default LostPetForm