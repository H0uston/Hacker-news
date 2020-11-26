import fetchData from "./fetchData";

export const newsAPI = {
    fetchLastNews: (count) => {
        return fetch(fetchData.baseURL + `/lastnews?count=${count}`);
    },
    fetchNews: (newsId) => {
        return fetch(fetchData.baseURL + `/news/${newsId}`);
    }
};



