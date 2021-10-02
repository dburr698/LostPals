import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import * as actionCreator from '../stores/creators/actionCreators'
import logo from '../images/Lost-Pals-Logo/blue.svg'


function Menu(props) {



    const handleLogOutButton = () => {
        localStorage.removeItem('jsonwebtoken')
        props.onLoggedOut()

    }

    return (
        <div className="menu">

            <Navbar fixed='top' bg='dark' variant='dark' expand='lg'>
                <Container>
                    <Link className="menu-link logo-containter" to='/' ><img className='logo-img' src={logo} /></Link>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav >
                            <NavDropdown title="Lost Pet" className='menu-link' >
                               <div> <Link className="menu-link dropdown-option" to='/lost-pet-gallery' >Lost Pet Gallery</Link></div>
                                <div>{props.isLoggedIn ? <Link className='menu-link dropdown-option' to='/report-lost-pet' >Report Lost Pet</Link> : null}</div>
                            </NavDropdown>
                            <NavDropdown title='Resources' className='menu-link' >
                                <div><a className='menu-link dropdown-option' target="_blank" href='https://www.vacationsmadeeasy.com/TheBLT/21PetTravelAccessoriesYouDidntKnowYouNeeded.html'>Pet Travel Gear</a></div>
                                <div><a className='menu-link dropdown-option' target='_blank' href='https://www.ready.gov/pets'>Emergency Plan</a></div>
                                </NavDropdown>
                            {props.isLoggedIn ? null : <Link className="menu-link" to='/login'>Login</Link>}
                            {props.isLoggedIn ? null : <Link className="menu-link" to='/register'>Register</Link>}
                            {props.isLoggedIn ? <Link className="menu-link" to='/my-pets'>My Pets</Link> : null}
                            {props.isLoggedIn ? <Link className='menu-link' to='/'><Button onClick={() => handleLogOutButton()}>Log Out</Button></Link> : null}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.loggedInRed.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoggedOut: () => dispatch(actionCreator.isLoggedOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)