import { Button, Container } from "react-bootstrap"


function MyPetsPage() {

    return(
        <div>
            <Container>
            <h1>My Pets</h1>


            <a href='/add-pet' ><Button>Register a New Pet</Button></a>
            </Container>
        </div>
    )
}

export default MyPetsPage