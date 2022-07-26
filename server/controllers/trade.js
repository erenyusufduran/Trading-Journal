const Trade = require("../models/Trade");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");

const getTrades = async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    const trades = await Trade.find({ createdBy: userId, belongTo: id, }).sort("createdAt");
    res.status(StatusCodes.OK).json({ trades, count: trades.length });
}

const getOneTrade = async (req, res) => {
    const { userId } = req.user;
    const { id, tradeID } = req.params;
    const trade = await Trade.findOne({ createdBy: userId, belongTo: id, _id: tradeID });
    if (!trade) {
        throw new NotFoundError(`No trade with id ${tradeListId}`);
    }
    res.status(StatusCodes.OK).json({ trade });
}

const createTrade = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    const { pair, shortLong, entry, size, tp, sl, wl } = req.body;
    if (!pair || !shortLong || !entry || !size) {
        throw new BadRequestError("Please provide pair, short/long, entry and size.");
    }
    const trade = await Trade.create({ createdBy: userId, ...req.body, belongTo: id, profit: 0, r: 0 });
    let profit = 0;
    r = 0;
    if (tp && sl) {
        profit = trade.calculateProfitOrLoss(shortLong, size, entry, tp, sl, wl);
        if (!wl) {
            r = trade.calculateR(shortLong, entry, tp, sl);
        } else {
            r = trade.calculateR(shortLong, entry, tp, sl, wl);
        }
    }
    const tradeUpdated = await Trade.findByIdAndUpdate(
        { _id: trade._id },
        { profit, r },
        { new: true, runValidators: true });

    res.status(StatusCodes.CREATED).json({ tradeUpdated });
}

module.exports = {
    getTrades, getOneTrade, createTrade
}