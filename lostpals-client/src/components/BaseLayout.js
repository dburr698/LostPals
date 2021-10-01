import Menu from "./Menu";


function BaseLayout(props) {

    return(
        <div>
            <Menu history = {props.history}/>
            {props.children}

        </div>
    )
}

export default BaseLayout