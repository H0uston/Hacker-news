import {
    SET_COMMENT_IS_CLOSED,
    SET_COMMENT_IS_OPENED,
    SET_COMMENTS,
    SET_NESTED_COMMENTS, SET_UPDATED_COMMENTS, SET_UPDATED_NESTED_COMMENTS, setCommentIsClosed, setCommentIsOpened,
    setComments, setNestedComments, setUpdatedComments, setUpdatedNestedComments,
} from "./commentsAction";
import {commentsAPI} from "../../API/commentsAPI";
import {newsAPI} from "../../API/newsAPI";

let initialState = {
    rootComments: [],
    openedComments: null,
    nestedComments: {},
    updateCommentsTime: 60000,
};


const commentsReducer = (state=initialState, action) => {
    let stateCopy = {...state};

    switch (action.type) {
        case (SET_COMMENTS):
            stateCopy.rootComments = action.comments.filter(c => !c.deleted); // filter deleted comments
            let openedComments = {};
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
        case (SET_COMMENT_IS_OPENED): // TODO make a function
            stateCopy.openedComments = {...stateCopy.openedComments};
            stateCopy.openedComments[action.commentId] = true;
            break;
        case (SET_COMMENT_IS_CLOSED): // TODO make a function
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

            if (newIds.length !== 0) { // if comments are updated
                stateCopy.rootComments = newComments;
                stateCopy.openedComments = {...stateCopy.openedComments};
                for (let newId of newIds) {
                    stateCopy.openedComments[newId] = false;
                }
            }
            break;
        case (SET_UPDATED_NESTED_COMMENTS):
            debugger;
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
    let response = await commentsAPI.getCommentData(commentId);
    if (response.status === 200) {
        return response.json();
    }
    console.log("ERROR: ");
    console.log(response);
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

const getNewsItem = async (newsId) => { // TODO
    let response = await newsAPI.getNewsItemData(newsId);
    if (response.status === 200) {
        return response.json();
    }
    throw Error("Error");
};

export const updateComments = (pageId) => async (dispatch, getState) => { // TODO mb divide it?
    let currentNestedComments = getState().commentsInfo.nestedComments;

    // Get root comment ids of news
    let response = await getNewsItem(pageId);
    // Get root comments
    if (response.kids !== 0) {
        let commentPromises = await getCommentsPromises(response.kids);
        let values = await Promise.all(commentPromises); // TODO values?
        dispatch(setUpdatedComments(values));

        // Get nested comments
        for (let parentId of Object.keys(currentNestedComments)) {
            let ids = currentNestedComments[parentId].map(c => c.id);
            let newNestedCommentsPromise = await getCommentsPromises(ids);
            let newNestedComments = await Promise.all(newNestedCommentsPromise); // TODO values?
            dispatch(setUpdatedNestedComments(newNestedComments, parentId));
        }
    }
};

export default commentsReducer;