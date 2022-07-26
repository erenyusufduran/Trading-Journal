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

    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user."],
    }
}, { versionKey: false, timestamps: true });

TradeSchema.methods.calculateProfitOrLoss = function (shortLong, size, entry, tp, sl, wl = "win") {
    let profit = 0;
    if (wl === "win") {
        if (shortLong === "short") {
            profit = (entry - tp) * size;
        } else {
            profit = (tp - entry) * size;
        }
    } else {
        if (shortLong === "short") {
            profit = (entry - sl) * size;
        } else {
            profit = (sl - entry) * size;
        }
    }
    return profit;
};

TradeSchema.methods.calculateR = function (shortLong, entry, tp, sl, wl = "win") {
    let r = 0;
    if (wl === "lose") {
        r = -1;
    }
    if (shortLong === "short") {
        r = (entry - tp) / (sl - entry);
    } else {
        r = (tp - entry) / (entry - sl);
    }
    return r;
};

module.exports = mongoose.model("Trade", TradeSchema);