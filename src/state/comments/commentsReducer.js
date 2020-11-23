import {
    SET_COMMENT_IS_CLOSED,
    SET_COMMENT_IS_OPENED,
    SET_COMMENTS,
    SET_NESTED_COMMENTS, SET_UPDATED_COMMENTS, SET_UPDATED_NESTED_COMMENTS, setCommentIsClosed, setCommentIsOpened,
    setComments, setNestedComments, setUpdatedComments, setUpdatedNestedComments,
} from "./commentsAction";
import {commentsAPI} from "../../API/commentsAPI";
import {getNewsItem} from "../news/newsReducer";


let initialState = {
    rootComments: [],
    openedComments: {},
    nestedComments: {},
    updateCommentsTime: 60000,
};


const commentsReducer = (state=initialState, action) => {
    let stateCopy = {...state};

    switch (action.type) {
        case (SET_COMMENTS):
            stateCopy.rootComments = action.comments.filter(c => !c.deleted); // filter deleted comments
            let openedComments = {...stateCopy.openedComments};
            for (let comment of stateCopy.rootComments) {
                openedComments[comment.id] = false;
            }
            stateCopy.openedComments = openedComments;
            break;
        case (SET_NESTED_COMMENTS):
            stateCopy.nestedComments = {...stateCopy.nestedComments};
            stateCopy.nestedComments[action.parentId] = action.nestedComments.filter(c => !c.deleted); // filter deleted comments

            stateCopy.openedComments = {...stateCopy.openedComments};
            for (let comment of action.nestedComments) {
                stateCopy.openedComments[comment.id] = false;
            }
            break;
        case (SET_COMMENT_IS_OPENED):
            stateCopy.openedComments = {...stateCopy.openedComments};
            stateCopy.openedComments[action.commentId] = true;
            break;
        case (SET_COMMENT_IS_CLOSED):
            stateCopy.openedComments = {...stateCopy.openedComments};
            stateCopy.openedComments[action.commentId] = false;
            break;
        case (SET_UPDATED_COMMENTS):
            let newComments = action.comments.filter(c => !c.deleted); // filter deleted comments
            // detecting new comments
            let newIds = newComments.map(c => c.id);
            let oldIds = stateCopy.rootComments.map(c => c.id);
            for (let i = 0; i < newIds.length; i++) {
                for (let j = 0; j < oldIds.length; j++) {
                    if (newIds[i] === oldIds[j]) {
                        newIds.splice(i,1);
                        oldIds.splice(j, 1);
                        i--;
                        j--;
                    }
                }
            }

            stateCopy.rootComments = newComments;
            if (newIds.length !== 0) { // if comments are updated
                stateCopy.openedComments = {...stateCopy.openedComments};
                for (let newId of newIds) {
                    stateCopy.openedComments[newId] = false;
                }
            }
            break;
        case (SET_UPDATED_NESTED_COMMENTS):
            // copy and getting ids in one for
            let oldNestedIds = [];
            let oldNestedComments = {};
            for (let nestedCommentsKey of Object.keys(stateCopy.nestedComments)) {
                oldNestedComments[nestedCommentsKey] = stateCopy.nestedComments[nestedCommentsKey];
                if (nestedCommentsKey === action.parentId) {
                    oldNestedIds = stateCopy.nestedComments[nestedCommentsKey].map(c => c.id);
                }
            }
            stateCopy.nestedComments = oldNestedComments;

            // filter deleted items and getting ids in one for
            let newNestedIds = [];
            let newNestedComments = [];
            for (let nestedComment of action.nestedComments) {
                if (!nestedComment.deleted) {
                    newNestedIds.push(nestedComment.id);
                    newNestedComments.push(nestedComment);
                }
            }
            stateCopy.nestedComments[action.parentId] = newNestedComments;

            // detecting new ids
            for (let i = 0; i < newNestedIds.length; i++) {
                for (let j = 0; j < oldNestedIds.length; j++) {
                    if (newNestedIds[i] === oldNestedIds[j]) {
                        newNestedIds.splice(i,1);
                        oldNestedIds.splice(j, 1);
                        i--;
                        j--;
                    }
                }
            }
            if (newNestedIds.length !== 0) {
                stateCopy.openedComments = {...stateCopy.openedComments};
                for (let newNestedId of newNestedIds) {
                    stateCopy.openedComments[newNestedId] = false;
                }
            }
            break;
    }

    return stateCopy;
};


const getCommentItem = async (commentId) => { // TODO is repeat?
    let response = await commentsAPI.fetchCommentData(commentId);
    return response.json();
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
    let comments = await Promise.all(commentPromises);
    dispatch(setComments(comments));
};

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

export const updateComments = (pageId) => async (dispatch, getState) => {
    let currentNestedComments = getState().commentsInfo.nestedComments;

    // Get root comment ids of news
    let response = await getNewsItem(pageId);
    // Get root comments
    if (response && response.kids) {
        let commentPromises = await getCommentsPromises(response.kids);
        let newRootComments = await Promise.all(commentPromises);
        dispatch(setUpdatedComments(newRootComments));
        // Get nested comments
        for (let parentId of Object.keys(currentNestedComments)) {
            let comment = await getCommentItem(parentId); // check if appears new nested comments
            let newNestedCommentsPromise = await getCommentsPromises(comment.kids);
            let newNestedComments = await Promise.all(newNestedCommentsPromise);
            dispatch(setUpdatedNestedComments(newNestedComments, parentId));
        }
    }
};

export default commentsReducer;