const { Router } = require('express');
const { 
    createTradeList,
    getTradeLists,
    getOneTradeList
} = require("../controllers/trade");

const tradeRouter = Router();

tradeRouter.route("/").post(createTradeList).get(getTradeLists);
tradeRouter.route("/:id").get(getOneTradeList);

module.exports = tradeRouter;