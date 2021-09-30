import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

function Menu() {
    return (
        <div className="menu">
            
                <Navbar bg='dark' variant='dark'>
                    <Link className="nav-link" to='/' ><h3>Lost Pals</h3></Link>
                    <NavDropdown title="Lost Pet" id="basic-nav-dropdown" > 
                        <Link className="nav-link" to='' >Lost Pet Gallery</Link>
                        <Link className='nav-link' to='/report-lost-pet' >Report Lost Pet</Link>
                    </NavDropdown>
                    <Link className="nav-link" to='/login'>Login</Link>
                    <Link className="nav-link" to='/register'>Register</Link>
                    <Link className="nav-link" to='/my-pets'>My Pets</Link>
                </Navbar>
            
        </div>
    )
}

export default Menu