const { Router } = require('express');
const {
    createTrade,
    getTrades,
    getOneTrade
} = require("../controllers/trade");

const tradeRouter = Router();

tradeRouter.route("/").post(createTrade).get(getTrades);
tradeRouter.route("/:id").get(getOneTrade);


module.exports = tradeRouter;