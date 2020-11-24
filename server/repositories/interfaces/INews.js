const newsRep = require("../implementations/APINewsRepository");

exports.INews = {
    getLastNews: newsRep.getLastNews,
    getNewsItem: newsRep.getNewsItem,
};