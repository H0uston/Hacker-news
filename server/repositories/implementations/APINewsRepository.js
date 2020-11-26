const {newsAPI} = require("./API/newsAPI");
const {fetchPromises} = require("../common/common");

const getLastNewsIds = async () => {
    let response = await newsAPI.fetchLastNewsIds();

    if (response.status === 200) {
        return response.json();
    }

    return {status: response.status, message: response.message};
};

const getNewsItem = async (newsId) => {
    let response = await newsAPI.fetchNewsItem(newsId);

    if (response.status === 200) {
        return await response.json();
    }

    return {status: response.status, message: response.statusText};
};

const getNewsItems = (newsIds, maxCount=100) => {
    let newsItemsPromises = [];
    let count = maxCount > newsIds.length ? newsIds.length : maxCount; // if received less ID than expected, choose
                                                                       // its length
    for (let i = 0; i < count; i++) {
        newsItemsPromises.push(getNewsItem(newsIds[i]));
    }

    return newsItemsPromises;
};

exports.getLastNews = async (maxCount) => {
    // Getting ids
    let newsIds = await getLastNewsIds();
    // Creating promises for ids
    let promises = getNewsItems(newsIds, maxCount);
    // Getting and filter of news items
    return await fetchPromises(promises);
};

exports.getNewsItem = async (newsId) => {
    return await getNewsItem(newsId);
};