export const getLastNewsItemsSelector = (state) => {
    return state.newsListInfo.lastNews.lastNewsItems;
};

export const getLastNewsMaxCountSelector = (state) => {
    return state.newsListInfo.lastNews.lastNewsMaxCount;
};

export const getUpdateNewsTimeSelector = (state) => {
    return state.newsListInfo.lastNews.updateNewsTime;
};