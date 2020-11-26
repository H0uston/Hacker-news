const {fetchData} = require("./fetchData");
const fetch = require("node-fetch");

exports.commentsAPI = {
    fetchCommentItem: (commentId) => {
        return fetch(fetchData.baseURL + `item/${commentId}.json?print=pretty`);
    },
};