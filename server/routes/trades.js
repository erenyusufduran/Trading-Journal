const { Router } = require("express");
const {
  createTradeList,
  getTradeLists,
  getOneTradeList,
  updateTradeList,
  deleteTradeList,
} = require("../controllers/tradeList");
const {
  createTrade,
  getTrades,
  getOneTrade,
  updateTrade,
  deleteTrade,
} = require("../controllers/trade");

const tradesRouter = Router();

tradesRouter.route("/").post(createTradeList).get(getTradeLists);
tradesRouter
  .route("/:id")
  .get(getOneTradeList)
  .patch(updateTradeList)
  .delete(deleteTradeList);

tradesRouter.route("/:id/details").post(createTrade).get(getTrades);
tradesRouter
  .route("/:id/details/:tradeID")
  .get(getOneTrade)
  .patch(updateTrade)
  .delete(deleteTrade);

module.exports = tradesRouter;
