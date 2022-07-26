const Trade = require("../models/Trade");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");

const getTrades = async (req, res) => {
    const { id } = req.params;
    const trades = await Trade.find({ belongTo: id }).sort("createdAt");
    res.status(StatusCodes.OK).json({ trades, count: trades.length });
}

const getOneTrade = async (req, res) => {
    const { id, tradeID } = req.params;
    const trade = await Trade.findOne({ belongTo: id, _id: tradeID });
    if (!trade) {
        throw new NotFoundError(`No trade with id ${tradeListId}`);
    }
    res.status(StatusCodes.OK).json({ trade });
}

const createTrade = async (req, res) => {
    const { id } = req.params;
    const { pair, shortLong, entry, size } = req.body;
    if (!pair || !shortLong || !entry || !size) {
        throw new BadRequestError("Please provide pair, short/long, entry and size.");
    }
    const trade = await Trade.create({ ...req.body, belongTo: id });
    res.status(StatusCodes.CREATED).json({ trade });
}

module.exports = {
    getTrades, getOneTrade, createTrade
}