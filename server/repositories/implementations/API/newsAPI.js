const {fetchData} = require("./fetchData");
const fetch = require("node-fetch");

exports.newsAPI = {
    fetchLastNewsIds: () => {
        return fetch(fetchData.baseURL + 'newstories.json?print=pretty');
    },
    fetchNewsItem: (newsId) => {
        return fetch(fetchData.baseURL + `item/${newsId}.json?print=pretty`);
    }
};



