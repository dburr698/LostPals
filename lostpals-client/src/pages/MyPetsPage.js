import { Button, Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import MyPetsList from "../components/MyPetsList"

function MyPetsPage(props) {

    
    return (
        <div>
            <Container>
                <h1>My Pets</h1>

                <MyPetsList />

                <NavLink to='/add-pet' ><Button>Register a New Pet</Button></NavLink>
            </Container>
        </div>
    )
}


export default MyPetsPage