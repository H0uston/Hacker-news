const {IComments} = require("../repositories/interfaces/IComments");

exports.getComments = async function (request, response) {
    let newsId = parseInt(request.params.newsId);
    if (isNaN(newsId)) {
        response.send({message: "Wrong id parameter"});
    } else {
        let comments = await IComments.getRootComments(newsId);

        response.send(comments);
    }
};

exports.getNestedComments = async function (request, response) {
    let commentId = parseInt(request.params.commentId);
    if (isNaN(commentId)) {
        response.send({message: "Wrong id parameter"});
    } else {
        let comments = await IComments.getNestedComments(commentId);

        response.send(comments);
    }
};

exports.getComment = async function (request, response) {
    let commentId = parseInt(request.params.commentId);
    if (isNaN(commentId)) {
        response.send({message: "Wrong id parameter"});
    } else {
        let commentItem = await IComments.getCommentItem(commentId);

        response.send(commentItem);
    }
};