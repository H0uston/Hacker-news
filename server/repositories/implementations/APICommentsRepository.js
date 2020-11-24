const {commentsAPI} = require("./API/commentsAPI");
const {INews} = require("../interfaces/INews");
const {fetchPromises} = require("../common/common");

const getCommentItem = async (commentId) => {
    let response = await commentsAPI.fetchCommentItem(commentId);

    if (response.status === 200) {
        return await response.json();
    }

    return {status: response.status, message: response.message};
};

const getCommentsPromises = (commentIds) => {
    let commentsPromises = [];
    let commentsCount = commentIds.length;
    for (let i = 0; i < commentsCount; i++) {
        commentsPromises.push(getCommentItem(commentIds[i]));
    }

    return commentsPromises;
};

const getNestedCommentsRecursive = async (nestedCommentIds, commentId, nestedCommentItems) => {
    let commentPromises = await getCommentsPromises(nestedCommentIds);
    let comments = await fetchPromises(commentPromises);
    nestedCommentItems[commentId] = comments;

    for (let comment of comments) {
        if (comment.kids) {
            await getNestedCommentsRecursive(comment.kids, comment.id, nestedCommentItems);
        }
    }

    return nestedCommentItems;
};

exports.getRootComments = async (pageId) => {
    let newsItem = await INews.getNewsItem(pageId);

    if (newsItem.kids) { // if news have comments
        let commentsPromises = await getCommentsPromises(newsItem.kids);

        return await fetchPromises(commentsPromises);
    }

    return [];
};

exports.getNestedComments = async (commentId) => {
    let commentItem = await getCommentItem(commentId);

    if (commentItem.kids) { // if news have reply
        let items = await getNestedCommentsRecursive(commentItem.kids, commentItem.id, {});

        return items;
    }

    return [];
};

exports.getCommentItem = async (commentId) => {
    return await getCommentItem(commentId);
};
