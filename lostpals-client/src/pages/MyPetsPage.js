import { Button, Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"


function MyPetsPage() {

    return(
        <div>
            <Container>
            <h1>My Pets</h1>


            <NavLink to='/add-pet' ><Button>Register a New Pet</Button></NavLink>
            </Container>
        </div>
    )
}

export default MyPetsPage