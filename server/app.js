const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require('express-rate-limit');

const authenticationMiddleWare = require("./middlewares/authentication");

const tradeRouter = require("./routes/trade");
const tradeListRouter = require('./routes/tradeList');
const authRouter = require("./routes/auth");
const notFoundMiddleware = require("./middlewares/not-found");

const app = express();

app.set("trust proxy", 1);
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
    res.send("<h1>We are building.</h1>")
});

app.use("/auth", authRouter);
app.use("/trades", authenticationMiddleWare, tradeListRouter);
app.use("/trades/details", tradeRouter);

app.use(notFoundMiddleware);

module.exports = app;
