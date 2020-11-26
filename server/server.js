const express = require("express");
const path = require("path");
const cors = require('cors');
const app = express();
const config = require("./config");

app.use(cors());

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

const apiRouter = require("./routes/apiRouter.js");

app.use("/api", apiRouter);

app.use("/", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(function (req, res) {
    res.status(404).send("Not Found");
});

app.listen(config.PORT);
