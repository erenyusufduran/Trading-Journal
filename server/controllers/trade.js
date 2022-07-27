const Trade = require("../models/Trade");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getTrades = async (req, res) => {
    const { user: { userId }, params: { id } } = req;
    const trades = await Trade.find({ createdBy: userId, belongTo: id, }).sort("createdAt");
    res.status(StatusCodes.OK).json({ trades, count: trades.length });
}

const getOneTrade = async (req, res) => {
    const { user: { userId }, params: { id, tradeID } } = req;
    const trade = await Trade.findOne({ createdBy: userId, belongTo: id, _id: tradeID });
    if (!trade) {
        throw new NotFoundError(`No trade with id ${tradeListId}`);
    }
    res.status(StatusCodes.OK).json({ trade });
}

const createTrade = async (req, res) => {
    const {
        user: { userId },
        params: { id },
        body: { pair, shortLong, entry, size, tp, sl, wl }
    } = req;
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
    const updatedTrade = await Trade.findByIdAndUpdate(
        { _id: trade._id },
        { profit, r },
        { new: true, runValidators: true });

    res.status(StatusCodes.CREATED).json({ updatedTrade });
}

const updateTrade = async (req, res) => {
    const {
        user: { userId },
        params: { id, tradeID },
        body: { pair, shortLong, entry, size, tp, sl, wl }
    } = req;
    if (!pair || !shortLong || !entry || !size) {
        throw new BadRequestError("Please provide pair, short/long, entry and size.");
    }

    const updatedTrade = await Trade.findByIdAndUpdate(
        { _id: tradeID, createdBy: userId },
        req.body,
        { new: true, runValidators: true });
    if (!updatedTrade) {
        throw new NotFoundError(`No trade with id ${trade._id}`);
    }

    updatedTrade.profit = 0;
    updatedTrade.r = 0;
    if (tp && sl) {
        updatedTrade.r = updatedTrade.calculateR(shortLong, entry, tp, sl);
        updatedTrade.profit = updatedTrade.calculateProfitOrLoss(shortLong, size, entry, tp, sl);
        if (wl) {
            updatedTrade.r = updatedTrade.calculateR(shortLong, entry, tp, sl, wl);
            updatedTrade.profit = updatedTrade.calculateProfitOrLoss(shortLong, size, entry, tp, sl, wl);
        }
    }
    res.status(StatusCodes.OK).json({ updatedTrade });
}

const deleteTrade = async (req, res) => {
    const {
        user: { userId },
        params: { tradeID },
    } = req;
    const trade = await Trade.findOneAndDelete({ _id: tradeID, createdBy: userId });
    if (!trade) {
        throw new NotFoundError(`No trade with id ${id}`);
    }
    res.status(StatusCodes.NO_CONTENT).send({ status: "success" });
}

module.exports = {
    getTrades, getOneTrade, createTrade, updateTrade, deleteTrade
}