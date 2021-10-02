import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"


function HomePage() {
    return(
        <div className='home-div'>
            <div className='hero-image'>
                <div className='hero-text'>
                    <h1>Give your pets a voice.</h1>
                    <h1>Register Today!</h1>
                    <Link to='/add-pet'><Button variant='primary' className='home-register-button'>Register a Pet</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage