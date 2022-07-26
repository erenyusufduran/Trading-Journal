const { Router } = require('express');
const {
    createTradeList,
    getTradeLists,
    getOneTradeList
} = require("../controllers/tradeList");
const {
    createTrade,
    getTrades,
    getOneTrade
} = require("../controllers/trade");

const tradesRouter = Router();

tradesRouter.route("/").post(createTradeList).get(getTradeLists);
tradesRouter.route("/:id").get(getOneTradeList);

tradesRouter.route("/:id/details").post(createTrade).get(getTrades);
tradesRouter.route("/:id/details/:tradeID").get(getOneTrade);

module.exports = tradesRouter;