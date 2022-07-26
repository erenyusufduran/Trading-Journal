require("dotenv").config();
require("express-async-errors");

const app = require("./app");
const connectDB = require("./db/connect");

const PORT = process.env.PORT;

async function startServer() {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

startServer();