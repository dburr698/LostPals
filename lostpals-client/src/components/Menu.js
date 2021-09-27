import { NavLink } from "react-router-dom"

function Menu() {
    return(
        <div className="menu">
            <NavLink className="link" to='/' >Home</NavLink>
            <NavLink className="link" to='/login'>Login</NavLink>
            <NavLink className="link" to='/register'>Register</NavLink>
        </div>
    )
}

export default Menu