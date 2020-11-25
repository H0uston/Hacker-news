const express = require("express");
const cors = require('cors');
const app = express();
const config = require("./config");

app.use(cors());

const apiRouter = require("./routes/apiRouter.js");

app.use("/api", apiRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(config.PORT);
