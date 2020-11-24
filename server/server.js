const express = require("express");
const app = express();
const config = require("./config");

const apiRouter = require("./routes/apiRouter.js");

app.use("/api", apiRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(config.PORT);
