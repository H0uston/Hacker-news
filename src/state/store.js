import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import newsListReducer from "./newsList/newsListReducer";
import newsReducer from "./news/newsReducer";
import commentsReducer from "./comments/commentsReducer";

let reducers = combineReducers({
    newsListInfo: newsListReducer,
    newsInfo: newsReducer,
    commentsInfo: commentsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;