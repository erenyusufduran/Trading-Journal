const Trade = require("../models/Trade");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");

const getTrades = async (req, res) => {

}

const getOneTrade = async (req, res) => {

}

const createTrade = async (req, res) => {

}

module.exports = {
    getTrades, getOneTrade, createTrade
}