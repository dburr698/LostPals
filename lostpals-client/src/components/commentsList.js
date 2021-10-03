import { connect } from "react-redux"


function CommentsList(props) {

    const commentItems = props.comments.map((comment) => {
        return <li className='commentLI' key={comment.id}>
            <b>{comment.user.username}: </b>{comment.message}
        </li>
    })

    return (
        <div>
            <ul className='commentsUL'>
                {commentItems}
            </ul>
        </div>
    )

}

const mapStateToProps = (state) => {
    return{
        comments: state.fetComRed.comments
    }
}

export default connect(mapStateToProps)(CommentsList)