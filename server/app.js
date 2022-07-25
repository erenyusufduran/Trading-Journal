const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require('express-rate-limit');

const authRouter = require("./routes/auth");
const notFoundMiddleware = require("./middlewares/not-found");

const app = express();
const PORT = process.env.PORT || 8000;

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

app.use(notFoundMiddleware);

function createServer() {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
}

createServer();