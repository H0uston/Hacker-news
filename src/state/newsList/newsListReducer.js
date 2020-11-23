import {SET_LAST_NEWS_ITEMS, setLastNewsItems} from "./newsListAction";
import {newsAPI} from "../../API/newsAPI";

let initialState = {
    lastNews: {
        lastNewsMaxCount: 100,
        lastNewsItems: null,
        updateNewsTime: 60000, // 60 seconds
    }
};


const newsListReducer = (state=initialState, action) => {
    let stateCopy = {...state};

    switch (action.type) {
        case (SET_LAST_NEWS_ITEMS):
            stateCopy.lastNews.lastNewsItems = action.newsItems;
            break;
    }

    return stateCopy;
};

const getLastNewsIds = async () => {
    let response = await newsAPI.fetchLastNewsIds();

    if (response.status === 200) {
        return response.json();
    }
    throw Error("Error");
};

const getNewsItem = async (newsId) => {
    let response = await newsAPI.fetchNewsItemData(newsId);
    if (response.status === 200) {
        return response.json();
    }
    throw Error("Error");
};

const getNewsItems = (newsIds, maxCount=100) => {
    let newsItemsPromises = [];
    let count = maxCount > newsIds.length ? newsIds.length : maxCount; // if received less ID than expected, choose
                                                                       // its length
    for (let i = 0; i < count; i++) {
        newsItemsPromises.push(getNewsItem(newsIds[i]));
    }

    return newsItemsPromises;
};

export const getLastNews = (maxCount) => async (dispatch) => {
    let newsIds = await getLastNewsIds();

    let promises = getNewsItems(newsIds, maxCount);

    let newsItems = await Promise.all(promises);
    dispatch(setLastNewsItems(newsItems));
};

export default newsListReducer;