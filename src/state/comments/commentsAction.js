export const SET_COMMENTS = "SET-COMMENTS";
export const SET_NESTED_COMMENTS = "SET-NESTED-COMMENTS";
export const SET_COMMENT_IS_OPENED = "SET-COMMENT-IS-OPENED";
export const SET_COMMENT_IS_CLOSED = "SET-COMMENT-IS-CLOSED";
export const SET_UPDATED_COMMENTS = "SET-UPDATED-COMMENTS";
export const SET_UPDATED_NESTED_COMMENTS = "SET-UPDATED-NESTED-COMMENTS";

export const setComments = (comments) => ({
    type: SET_COMMENTS, comments
});

export const setNestedComments = (nestedComments, parentId) => ({
    type: SET_NESTED_COMMENTS, nestedComments, parentId
});

export const setCommentIsOpened = (commentId) => ({
    type: SET_COMMENT_IS_OPENED, commentId
});

export const setCommentIsClosed = (commentId) => ({
    type: SET_COMMENT_IS_CLOSED, commentId
});

export const setUpdatedComments = (comments) => ({
    type: SET_UPDATED_COMMENTS, comments
});

export const setUpdatedNestedComments = (nestedComments, parentId) => ({
    type: SET_UPDATED_NESTED_COMMENTS, nestedComments, parentId
});
