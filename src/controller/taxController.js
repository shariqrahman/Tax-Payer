const taxModel = require("../model/taxModel");
const taxPayerModel = require("../model/taxPayerModel");
const validator = require('../validator/validator');


// Get Accountant By Id
const taxPay = async function(req, res) {
    try {
console.log(req.taxPayerId , req.params.id)
        if ((req.taxPayerId != req.params.id)) {
            return res.status(403).send({ status: false, message: "You are not a Tax Payer" })
        }
        let data = req.body;
        if (!validator.isValidRequestBody(data)) { 
            return res.status(400).send({ status: false, message: "Bad request, No data provided." }) 
        };
        let { totalSales, city, taxSlab } = data
        data.userId = req.params.id
        let UT = ["Andaman and Nicobar", "Chandigarh", "Daman and Diu", "Dadar and Nagar Haveli", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep"]

        data.CGST = (totalSales * taxSlab) / 100

        if (UT.indexOf(city) !== -1) { 
            data.SGST = 0 
        }
        else { 
            data.SGST = data.CGST 
        }
        let totalTax = data.SGST + data.CGST;
        data.totalTax = totalTax

        let createdData = await taxModel.create(data)
        return res.status(201).send({ status: true, data: createdData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// Get Accountant By Id
const editTaxPayer = async function(req, res) {
    try {
        if ((req.role == "Tax Payer")) {
            return res.status(403).send({ status: false, message: "Only Tax Accountant and Admin are allowed for this job" })
        }
        let data = req.body
        const updatedData = await taxModel.findOneAndUpdate({ userId: data.userId }, data, { new: true })
        return res.status(200).send({ status: true, data: updatedData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// Get Accountant By Id
const getTaxDetailsById = async function (req, res) {
    try {

        let id = req.params.id
        const user = await taxPayerModel.findOne({ _id: id })
        if (!user) { return res.status(400).send({ status: false, message: "Use a valid User Id" }) }

        let userTax = await taxModel.findOne({ userId: id }).populate("userId")
        return res.status(200).send({ status: true, data: userTax })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// Get Tax Details By Filter
const getTaxDetailsFilter = async function(req, res) {
    try {
        if ((req.role == "Tax Payer")) {
            return res.status(403).send({ status: false, message: "Only Tax Accountant and Admin are allowed for this job" })
        }
        let filter = req.query
        // filter = { userId, data, taxStatus }
        const filteredProducts = await taxModel.find(filter)
        return res.status(200).send({ status: true,count :filteredProducts.length, data: filteredProducts })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {
    taxPay,
    editTaxPayer,
    getTaxDetailsById,
    getTaxDetailsFilter
}