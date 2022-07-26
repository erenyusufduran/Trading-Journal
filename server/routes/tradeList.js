const { Router } = require('express');
const { 
    createTradeList,
    getTradeLists,
    getOneTradeList
} = require("../controllers/tradeList");

const tradeListRouter = Router();

tradeListRouter.route("/").post(createTradeList).get(getTradeLists);
tradeListRouter.route("/:id").get(getOneTradeList);

module.exports = tradeListRouter;