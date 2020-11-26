import newsListReducer from "../state/newsList/newsListReducer";
import {setLastNewsItems} from "../state/newsList/newsListAction";

let initialState = {
    lastNews: {
        lastNewsMaxCount: 100,
        lastNewsItems: null,
        updateNewsTime: 60000, // 60 seconds
    }
};

let createLastNews = (count) => {
    let lastNews = [];
    for (let i = 0; i < count; i++) {
        lastNews.push({id: i, name: i.toString()})
    }

    return lastNews;
};

describe("test newsListReducer", () => {
    let testNumbers = [0, 1, 5, 15, 100];

    for (let testNumber of testNumbers) {
        it(`Set last ${testNumber} news`, () => {
            let lastNews = createLastNews(testNumber);

            let newState = newsListReducer(initialState, setLastNewsItems(lastNews));

            expect(newState.lastNews.lastNewsItems.length).toBe(testNumber);
        });
    }
});
