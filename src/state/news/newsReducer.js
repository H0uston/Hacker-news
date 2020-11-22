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

export const getNewsItem = async (newsId) => { // TODO
    let response = await newsAPI.getNewsItemData(newsId);
    if (response.status === 200) {
        return response.json();
    }
    throw Error("Error"); // TODO
};

export const getNewsInfo = (newsId) => async (dispatch) => {
    let response = await getNewsItem(newsId);
    dispatch(setNewsInfo(response));
};

export default newsReducer;