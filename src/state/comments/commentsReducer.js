import {
    SET_COMMENT_IS_CLOSED,
    SET_COMMENT_IS_OPENED,
    SET_COMMENTS,
    SET_NESTED_COMMENTS, setCommentIsClosed, setCommentIsOpened,
    setComments, setNestedComments,
} from "./commentsAction";
import {commentsAPI} from "../../API/commentsAPI";

let initialState = {
    rootComments: [],
    openedComments: null,
    nestedComments: {},
};


const commentsReducer = (state=initialState, action) => {
    let stateCopy = {...state};

    switch (action.type) {
        case (SET_COMMENTS):
            stateCopy.rootComments = [...action.comments];
            let openedComments = {};
            for (let comment of stateCopy.rootComments) {
                openedComments[comment.id] = false;
            }
            stateCopy.openedComments = openedComments;
            break;
        case (SET_NESTED_COMMENTS):
            stateCopy.nestedComments = {...stateCopy.nestedComments};
            stateCopy.nestedComments[action.parentId] = action.nestedComments;

            stateCopy.openedComments = {...stateCopy.openedComments};
            for (let comment of action.nestedComments) {
                stateCopy.openedComments[comment.id] = false;
            }
            break;
        case (SET_COMMENT_IS_OPENED): // TODO make a function
            stateCopy.openedComments = {...stateCopy.openedComments};
            stateCopy.openedComments[action.commentId] = true;
            break;
        case (SET_COMMENT_IS_CLOSED): // TODO make a function
            stateCopy.openedComments = {...stateCopy.openedComments};
            stateCopy.openedComments[action.commentId] = false;
            break;
    }

    return stateCopy;
};


const getCommentItem = async (commentId) => {
    let response = await commentsAPI.getCommentData(commentId);
    if (response.status === 200) {
        return response.json();
    }
    throw Error("Error"); // TODO
};

const getCommentsPromises = (commentIds) => {
    let commentsPromises = [];
    let commentsCount = commentIds.length;
    for (let i = 0; i < commentsCount; i++) {
        commentsPromises.push(getCommentItem(commentIds[i]));
    }
    return commentsPromises;
};

export const getListOfComments = (commentIds) => async (dispatch) => {
    let commentPromises = await getCommentsPromises(commentIds);
    let values = await Promise.all(commentPromises);
    dispatch(setComments(values));
};

/*
const getNestedCommentsRecursive = async (nestedCommentIds) => {
    let nestedCommentItems = [];
    let commentPromises = await getCommentsPromises(nestedCommentIds);
    let comments = await Promise.all(commentPromises);

    for (let comment of comments) {
        if (comment.kids) {
            comment.nestedComments = await getNestedCommentsRecursive(comment.kids, comment.id);
        }
        nestedCommentItems.push(comment);
    }
    return nestedCommentItems;
};

*/

export const getNestedComments = (nestedCommentIds, parentId) => async (dispatch) => {
    let commentPromises = await getCommentsPromises(nestedCommentIds);
    let comments = await Promise.all(commentPromises);
    dispatch(setNestedComments(comments, parentId));
};

export const openComment = (commentId) => (dispatch) => {
    dispatch(setCommentIsOpened(commentId));
};

export const closeComment = (commentId) => (dispatch) => {
    dispatch(setCommentIsClosed(commentId));
};
/*
const updateNestedComments = async (commentItems, openedComments) => {
    let comments = {};
    for (let openedCommentKey of Object.keys(openedComments)) {
        if (openedComments[openedCommentKey]) {
            let [commentItem] = commentItems.filter(c => c.id == openedCommentKey);

            if (commentItem && commentItem.kids) {
                let commentPromises = await getNestedCommentsRecursive(commentItem.kids);
                comments[commentItem.id] = await Promise.all(commentPromises);
            }
        }
    }

    return comments;
};

export const updateListOfComments =  (commentIds) => async (dispatch, getState) => {
    let openedComments = getState().commentsInfo.openedComments;
    let commentPromises = await getCommentsPromises(commentIds);
    let commentItems = await Promise.all(commentPromises);
    dispatch(setComments(commentItems));
    let comments = await updateNestedComments(commentItems, openedComments);
    for (let commentId of Object.keys(comments)) {
        dispatch(setNestedComments(comments, commentId));
    }
};
*/
export default commentsReducer;