const {INews} = require("../repositories/interfaces/INews");

exports.getLastNews = async function (request, response) {
    let countOfNews = parseInt(request.query['count']);
    if (isNaN(countOfNews)) {
        countOfNews = undefined;
    }

    let lastNewsItems = await INews.getLastNews(countOfNews);

    response.send(lastNewsItems);
};

exports.getNews = async function (request, response) {
    let newsId = parseInt(request.params.newsId);
    if (isNaN(newsId)) {
        response.send({message: "Wrong id parameter"});
    } else {
        let newsItem = await INews.getNewsItem(newsId);

        response.send(newsItem);
    }
};
