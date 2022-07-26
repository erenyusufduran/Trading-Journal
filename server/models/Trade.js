const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
    date: { type: Date },
    pair: {
        type: String,
        required: [true, "Please provide a pair name."],
    },
    shortLong: {
        type: String,
        enum: {
            values: ["short", "long"],
            message: "{VALUE} is not supported.",
        },
        required: [true, "Please provide short or long."]
    },
    entry: {
        type: Number,
        required: [true, "Please provide an entry point."]
    },
    tp: {
        type: Number,
    },
    sl: {
        type: Number,
    },
    size: {
        type: Number,
        required: [true, "Please provide the size at your transaction."]
    },
    r: {
        type: Number,
    },
    profit: {
        type: Number
    },
    wl: {
        type: String,
        enum: {
            values: ["win", "lose"],
            message: "{VALUE} is not supported."
        },
    },
    link: {
        type: String,
    },
    reasons: {
        type: String,
    },
    results: {
        type: String,
    },
    belongTo: {
        type: mongoose.Types.ObjectId,
        ref: "TradeList",
        required: [true, "Please provide a trade list."],

    }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("Trade", TradeSchema);