import fetchData from "./fetchData";

export const newsAPI = {
    getLastNewsIds: () => {
        return fetch(fetchData.baseURL + 'newstories.json?print=pretty');
    },
    getNewsItemData: (newsId) => {
        return fetch(fetchData.baseURL + `item/${newsId}.json?print=pretty`);
    }
};



