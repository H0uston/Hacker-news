import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Comments from "./Comments";
import {
    getListOfComments,
    openComment,
    closeComment,
    getNestedComments,
} from "../../../state/comments/commentsReducer";
import {getNestedCommentsSelector, getOpenedCommentsSelector, getRootCommentsSelector} from "../../../selectors/commentsSelectors";

const CommentsContainer = (props) => {
    return <Comments {...props}/>
};

let mapStateToProps = (state) => ({
    rootComments: getRootCommentsSelector(state),
    openedComments: getOpenedCommentsSelector(state),
    nestedComments: getNestedCommentsSelector(state),
});


export default compose(
    connect(mapStateToProps, {getListOfComments, openComment, closeComment, getNestedComments}),
    withRouter
)(CommentsContainer);

