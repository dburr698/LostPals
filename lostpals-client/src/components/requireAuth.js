import { Component } from 'react'
import { connect } from 'react-redux'


export default function(ComposedComponent) {

    class Authenticate extends Component {
        constructor(props){
            super(props)

            if(!this.props.isAuthenticated){
                this.props.history.push('/login')
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }


    const mapStateToProps = (state) => {
        return{
            isAuthenticated: state.loggedInRed.isLoggedIn
        }
    }

    return connect(mapStateToProps)(Authenticate)

}