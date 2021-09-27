import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

function RegistrationPage(props) {

    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')

    const handleRegisterChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleRegisterButton = (e) => {
        e.preventDefault()

        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    props.history.push('/login')
                } else {
                    setMessage(result.message)
                }
            })


    }

    return (
        <div>
            <h1>Registration</h1>
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" onChange={handleRegisterChange} placeholder="Enter Username" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={handleRegisterChange} placeholder="example@email.com" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleRegisterChange} placeholder="Enter Password" required />
                    </Form.Group>
                    <Form.Group>
                        {message && <Form.Text>{message}</Form.Text>}
                    </Form.Group>
                    <Button variant="primary" onClick={handleRegisterButton} >Register</Button>

                </Form>
            </Container>

        </div>
    )
}

export default RegistrationPage