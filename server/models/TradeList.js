const mongoose = require("mongoose");

const TradeListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a trade name."],
        maxlength: 25,
    },
    exchange: {
        type: String,
        required: [true, "Please provide a exchange name for calculate profits and losses."],
        maxlength: 20,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user."],
    }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("TradeList", TradeListSchema);