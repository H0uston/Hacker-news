const express = require("express");
const commentsController = require("../controllers/commentsController");
const newsController = require("../controllers/newsController");

const apiRouter = express.Router();

apiRouter.use("/lastnews", newsController.getLastNews);
apiRouter.use("/news/:newsId", newsController.getNews);

apiRouter.use("/comments/:newsId", commentsController.getComments);
apiRouter.use("/nestedcomments/:commentId", commentsController.getNestedComments);
apiRouter.use("/comment/:commentId", commentsController.getComment);

module.exports = apiRouter;