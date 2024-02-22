const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatarurl: {
        type: String,
    }
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;