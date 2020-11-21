import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import newsListReducer from "./newsList/newsListReducer";
import newsReducer from "./news/newsReducer";
import commentsReducer from "./comments/commentsReducer";

let reducers = combineReducers({
    newsListInfo: newsListReducer,
    newsInfo: newsReducer,
    commentsInfo: commentsReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;