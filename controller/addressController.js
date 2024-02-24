const Address = require("../models/address");
const Vendor = require("../models/vendor");

const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find().populate('vendorId');
        res.json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id).populate('vendorId');
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(201).json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const findOneFromVendorAndCreateAddress = async (req, res) => {
    try {
        const { vendorId, address } = req.body;
        const res = await Address.findOne({ vendorId: vendorId });
        if (res) {
            return res.status(200).json({ message: "Address Already Store" });
        }
        await Address.create({ vendorId: vendorId, address });
        res.status(201).json({ response: "OK" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    getAddresses,
    getAddressById,
    findOneFromVendorAndCreateAddress,
};