export const getNewsInfoIsFetchingSelector = (state) => {
    return state.newsInfo.isFetching;
};

export const getNewsDataSelector = (state) => {
    return state.newsInfo.pageInfo;
};
