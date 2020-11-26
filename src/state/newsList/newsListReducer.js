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
        default:
            break;
    }

    return stateCopy;
};

export const getLastNews = (maxCount) => async (dispatch) => {
    let response = await newsAPI.fetchLastNews(maxCount);
    if (response.status === 200) {
        let newsItems = await response.json();
        dispatch(setLastNewsItems(newsItems));
    } else {
        throw Error(response.statusText);
    }
};

export default newsListReducer;