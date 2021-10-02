import Menu from "./Menu";
import '../styles/style.css'


function BaseLayout(props) {

    return(
        <div>
            <Menu history = {props.history}/>
            {props.children}

        </div>
    )
}

export default BaseLayout