import fetchData from "./fetchData";

export const newsAPI = {
    fetchLastNewsIds: () => {
        return fetch(fetchData.baseURL + 'newstories.json?print=pretty');
    },
    fetchNewsItemData: (newsId) => {
        return fetch(fetchData.baseURL + `item/${newsId}.json?print=pretty`);
    }
};



