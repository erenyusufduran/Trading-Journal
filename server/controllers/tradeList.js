const TradeList = require("../models/TradeList");
const Trade = require("../models/Trade");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");

const getTradeLists = async (req, res) => {
    const { userId } = req.user;
    const tradeLists = await TradeList.find({ createdBy: userId }).sort("createdAt");
    res.status(StatusCodes.OK).json({ tradeLists, count: tradeLists.length });
}

const getOneTradeList = async (req, res) => {
    const { user: userId, params: { id: tradeListId } } = req;
    const tradeList = await TradeList.findOne({ _id: tradeListId, createdBy: userId.userId });
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
    const tradeList = await TradeList.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ tradeList });
}

const updateTradeList = async (req, res) => {
    const {
        body: { name, exchange },
        user: { userId },
        params: { id }
    } = req;
    if (name === "" || exchange === "") {
        throw new BadRequestError("Name or exchange fields cannot be empty");
    }
    const tradeList = await TradeList.findByIdAndUpdate(
        { _id: id, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!tradeList) {
        throw new NotFoundError(`No trade list with id ${tradeListId}`);
    }
    res.status(StatusCodes.OK).json({ tradeList });
}

const deleteTradeList = async (req, res) => {
    const {
        user: { userId },
        params: { id },
    } = req;
    const tradeList = await TradeList.findOneAndDelete({ _id: id, createdBy: userId });
    if (!tradeList) {
        throw new NotFoundError(`No trade list with id ${tradeListId}`);
    }
    await Trade.deleteMany({ belongTo: tradeList._id })
    res.status(StatusCodes.NO_CONTENT).send();
}

module.exports = {
    createTradeList, getTradeLists, getOneTradeList, updateTradeList, deleteTradeList
}