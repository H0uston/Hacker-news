const commentsRep = require("../implementations/APICommentsRepository");

exports.IComments = {
    getRootComments: commentsRep.getRootComments,
    getNestedComments: commentsRep.getNestedComments,
    getCommentItem: commentsRep.getCommentItem,
};