const TradeLists = require("../models/TradeList");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");

const getTradeLists = async (req, res) => {
    const { userId } = req.user;
    const tradeLists = await TradeLists.find({ createdBy: userId }).sort("createdAt");
    res.status(StatusCodes.OK).json({ tradeLists, count: tradeLists.length });
}

const getOneTradeList = async (req, res) => {
    const { user: userId, params: { id: tradeListId } } = req;
    const tradeList = await TradeLists.findOne({ _id: tradeListId, createdBy: userId.userId });
    if (!tradeList) {
        throw new NotFoundError(`No trade list with id ${tradeListId}`);
    }
    res.status(StatusCodes.OK).json({ tradeList });
}

const createTradeList = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const { name, exchange, createdBy } = req.body;
    if (!createdBy) {
        throw new UnauthenticatedError("Please provide user.")
    }
    if (!name || !exchange) {
        throw new BadRequestError("Please provide name and exchange.");
    }
    const tradeList = await TradeLists.create({ ...req.body });
    res.status(StatusCodes.OK).json({ tradeList });
}

module.exports = {
    createTradeList, getTradeLists, getOneTradeList
}