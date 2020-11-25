import {
    SET_COMMENT_IS_CLOSED,
    SET_COMMENT_IS_OPENED,
    SET_COMMENTS,
    SET_NESTED_COMMENTS, SET_UPDATED_COMMENTS, SET_UPDATED_NESTED_COMMENTS, setCommentIsClosed, setCommentIsOpened,
    setComments, setNestedComments, setUpdatedComments, setUpdatedNestedComments,
} from "./commentsAction";
import {commentsAPI} from "../../API/commentsAPI";


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
            stateCopy.rootComments = action.comments; // filter deleted comments
            let openedComments = {...stateCopy.openedComments};
            for (let comment of stateCopy.rootComments) {
                openedComments[comment.id] = false;
            }
            stateCopy.openedComments = openedComments;
            break;
        case (SET_NESTED_COMMENTS):
            stateCopy.nestedComments = {...stateCopy.nestedComments, ...action.nestedComments};

            stateCopy.openedComments = {...stateCopy.openedComments};
            for (let commentKey of Object.keys(action.nestedComments)) {
                for (let comment of action.nestedComments[commentKey]) {
                    stateCopy.openedComments[comment.id] = false;
                }
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
            let newComments = action.comments; // filter deleted comments
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

            let newNestedIds = [];
            for (let nestedCommentKey of Object.keys(action.nestedComments)) {
                for (let comment of action.nestedComments[nestedCommentKey]) {
                    newNestedIds.push(comment.id);
                }
            }
            stateCopy.nestedComments = {...stateCopy.nestedComments, ...action.nestedComments};

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


const getCommentItem = async (commentId) => {
    let response = await commentsAPI.fetchCommentItem(commentId);
    if (response.status === 200) {
        return await response.json();
    } else {
        throw Error(response.statusText);
    }
};

export const getListOfComments = (newsId) => async (dispatch) => {
    let response = await commentsAPI.fetchRootComments(newsId);
    if (response.status === 200) {
        let comments = await response.json();
        dispatch(setComments(comments));
    } else {
        throw Error(response.statusText);
    }
};

export const getNestedComments = (commentId) => async (dispatch) => {
    let response = await commentsAPI.fetchNestedComments(commentId);
    if (response.status === 200) {
        let comments = await response.json();
        dispatch(setNestedComments(comments, commentId));
    } else {
        throw Error(response.statusText);
    }
};

export const openComment = (commentId) => (dispatch) => {
    dispatch(setCommentIsOpened(commentId));
};

export const closeComment = (commentId) => (dispatch) => {
    dispatch(setCommentIsClosed(commentId));
};

export const updateComments = (newsId) => async (dispatch, getState) => {
    let currentNestedComments = getState().commentsInfo.nestedComments;

    // Get root comment ids of news
    let response = await commentsAPI.fetchRootComments(newsId);
    if (response.status === 200) {
        let comments = await response.json();
        dispatch(setUpdatedComments(comments));
        // Get nested comments
        for (let comment of comments) { // TODO
            if (currentNestedComments.hasOwnProperty(comment.id)) {  // if this root comment has been opened
                let response = await commentsAPI.fetchNestedComments(comment.id);  // we have to update his nested comments
                if (response.status === 200) {
                    dispatch(setUpdatedNestedComments(await response.json(), comment.id));
                }
            }
        }
    }
};

export default commentsReducer;