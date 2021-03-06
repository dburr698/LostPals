import { useEffect } from "react"
import { Button, Container } from "react-bootstrap"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import MyPetsList from "../components/MyPetsList"
import * as actionCreator from '../stores/creators/actionCreators'

function MyPetsPage(props) {

    
    return (
        <div>
            <Container>
                <h1>My Pets</h1>
                <NavLink to='/add-pet' ><Button className='mb-3 register-button'>Register a New Pet</Button></NavLink>


                <MyPetsList />

            </Container>
        </div>
    )
}




export default MyPetsPage