import {SET_NEWS_INFO, setNewsInfo} from "./newsAction";
import {newsAPI} from "../../API/newsAPI";

let initialState = {
    pageInfo: null,
    isFetching: false
};


const newsReducer = (state=initialState, action) => {
    let stateCopy = {...state};

    switch (action.type) {
        case (SET_NEWS_INFO):
            stateCopy.pageInfo = action.newsInfo;
            break;
    }

    return stateCopy;
};

export const getNewsInfo = (newsId) => async (dispatch) => {
    let response = await newsAPI.fetchNews(newsId);
    if (response.status === 200) {
        let newsInfo = await response.json();
        dispatch(setNewsInfo(newsInfo));
    } else {
        throw Error(response.statusText);
    }
};

export default newsReducer;