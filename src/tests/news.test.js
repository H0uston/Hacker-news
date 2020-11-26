import newsReducer from "../state/news/newsReducer";
import {setNewsInfo} from "../state/news/newsAction";

let initialState = {
    pageInfo: null,
    isFetching: false
};

let newsInfo = {
    title: "Interesting news",
    date: 312321523,
    author: "Houston",
};

describe("test newsReducer", () => {

    it("Set news with url", () => {
        newsInfo.url = "https://127.0.0.1";
        let newState = newsReducer(initialState, setNewsInfo(newsInfo));

        expect(newState.pageInfo.url).toBe(newsInfo.url);
    });

    it("Set news with text", () => {
        newsInfo.text = "Simple text";
        let newState = newsReducer(initialState, setNewsInfo(newsInfo));

        expect(newState.pageInfo.text).toBe(newsInfo.text);
    });
});