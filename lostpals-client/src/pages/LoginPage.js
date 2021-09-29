import { useState } from "react"
import { Button, Container, Form, Alert } from "react-bootstrap"
import { connect } from 'react-redux'
import * as actionCreator from '../stores/creators/actionCreators'


function LoginPage(props) {

    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')

    const handleLoginChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleLoginButton = (e) => {
        e.preventDefault()

        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    props.onStoreUserId(result.userId)
                    const token = result.token
                    localStorage.setItem('jsonwebtoken', token)
                    props.history.push('/')
                } else {
                    setMessage(result.message)
                }
            })
    }

    return (
        <div>

            <Container>
                <h1>Login</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" onChange={handleLoginChange} placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleLoginChange} placeholder="Enter Password" />
                    </Form.Group>
                    <Form.Group>
                        {message && <Alert variant='danger'>{message}</Alert>}
                    </Form.Group>
                    <Button variant='primary' onClick={handleLoginButton}>Login</Button>
                    <a href='/register'><Button className="m-2" variant="success">Create an Account</Button></a>
                </Form>
            </Container>
        </div>
    )
}

const mapDispachToProps = (dispatch) => {
    return {
        onStoreUserId: (userId) => dispatch(actionCreator.storeUserId(userId))
    }
}


export default connect(null, mapDispachToProps)(LoginPage)