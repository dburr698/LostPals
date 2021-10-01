import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import * as actionCreator from '../stores/creators/actionCreators'


function Menu(props) {

    

    const handleLogOutButton = () => {
        localStorage.removeItem('jsonwebtoken')
        props.onLoggedOut()
        
    }

    return (
        <div className="menu">
            
                <Navbar bg='dark' variant='dark'>
                    <Link className="nav-link" to='/' ><h3>Lost Pals</h3></Link>
                    <NavDropdown title="Lost Pet" id="basic-nav-dropdown" > 
                        <Link className="nav-link" to='/lost-pet-gallery' >Lost Pet Gallery</Link>
                        {props.isLoggedIn ? <Link className='nav-link' to='/report-lost-pet' >Report Lost Pet</Link> : null }
                    </NavDropdown>
                    {props.isLoggedIn ? null : <Link className="nav-link" to='/login'>Login</Link> }
                    {props.isLoggedIn ? null : <Link className="nav-link" to='/register'>Register</Link> }
                    {props.isLoggedIn ? <Link className="nav-link" to='/my-pets'>My Pets</Link> : null }
                    {props.isLoggedIn ? <Link className='nav-link' to='/'><Button onClick={() => handleLogOutButton()}>Log Out</Button></Link> : null }
                </Navbar>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        isLoggedIn: state.loggedInRed.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onLoggedOut: () => dispatch(actionCreator.isLoggedOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)