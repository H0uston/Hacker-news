export const getRootCommentsSelector = (state) => {
    return state.commentsInfo.rootComments;
};

export const getOpenedCommentsSelector = (state) => {
    return state.commentsInfo.openedComments;
};

export const getNestedCommentsSelector = (state) => {
    return state.commentsInfo.nestedComments;
};
