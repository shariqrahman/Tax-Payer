const adminModel = require("../model/adminModel")
const accountantModel = require("../model/accountantModel")
const bcrypt = require("bcrypt")
const validator = require("../validator/validator")
const taxPayerModel = require("../model/taxPayerModel")

// Create New Admin Api
const createAnotherAdmin = async function(req, res) {
    try {
        if (req.role != 'Admin') { 
            return res.status(403).send({ status: false, message: "You are not Authorised to create an Admin" }) 
        }
        let data = req.body;
        if (!validator.isValidRequestBody(data)) { 
            return res.status(400).send({ status: false, message: "Bad request, No data provided." }) 
        };
        let { fname, lname, email, phone, password } = data

        if (!validator.isValid(fname)) { 
            return res.status(400).send({ status: false, message: "fname is required" }) 
        }
        if (!validator.isValid(lname)) { 
            return res.status(400).send({ status: false, message: "lname is required" }) 
        }
        // Email validation
        if (!validator.isValid(email)) { 
            return res.status(400).send({ status: false, message: "email is required" }) 
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email.trim()))) { 
            return res.status(400).send({ status: false, message: "Please provide a valid email" }) 
        };
        let duplicateEmail = await adminModel.findOne({ email: email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, message: 'Email is already exist' })
        }
        // Phone number Validation
        if (!validator.isValid(phone)) { 
            return res.status(400).send({ status: false, message: "phone is required" }) 
        }
        if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone.trim()))) { 
            return res.status(400).send({ status: false, message: "please provide a valid moblie Number" }) 
        }
        let duplicateNumber = await adminModel.findOne({ phone: phone })
        if (duplicateNumber) {
            return res.status(400).send({ status: false, message: 'Phone number is already exist' })
        }
        // Password Validation
        if (!validator.isValid(password)) { 
            return res.status(400).send({ status: false, message: "password is required" }) }
        if (!(password.length >= 8 && password.length <= 15)) { 
            return res.status(400).send({ status: false, message: "Password length should be 8 to 15 characters" }) 
        }
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password.trim()))) { 
            return res.status(400).send({ status: false, message: "please provide atleast one uppercase letter ,one lowercase, one character and one number " }) 
        }
        let securePassword = await bcrypt.hash(password, 4)
        data.password = securePassword

        let userCreated = await adminModel.create(data);
        res.status(201).send({ status: true, message: "User created successfully", data: userCreated })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// Register Accountant Api
const createAccountant = async function(req, res) {
    try {
        if (req.role != 'Admin') { return res.status(403).send({ status: false, message: "You are not Authorised to create an Admin" }) }
        let data = req.body;
        if (!validator.isValidRequestBody) { 
            return res.status(400).send({ status: false, message: "Bad request, No data provided." }) 
        };
        let { fname, lname, email, phone, password } = data

        if (!validator.isValid(fname)) { 
            return res.status(400).send({ status: false, message: "fname is required" }) 
        }
        if (!validator.isValid(lname)) { 
            return res.status(400).send({ status: false, message: "lname is required" }) 
        }
        // Email validation
        if (!validator.isValid(email)) { 
            return res.status(400).send({ status: false, message: "email is required" }) 
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email.trim()))) { 
            return res.status(400).send({ status: false, message: "Please provide a valid email" }) 
        };
        let duplicateEmail = await accountantModel.findOne({ email: email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, message: 'Email is already exist' })
        }
        // Phone number Validation :
        if (!validator.isValid(phone)) { 
            return res.status(400).send({ status: false, message: "phone is required" }) 
        }
        if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone.trim()))) { 
            return res.status(400).send({ status: false, message: "please provide a valid moblie Number" }) 
        }
        let duplicateNumber = await accountantModel.findOne({ phone: phone })
        if (duplicateNumber) {
            return res.status(400).send({ status: false, message: 'Phone number is already exist' })
        }
        // Password Validation :
        if (!validator.isValid(password)) { 
            return res.status(400).send({ status: false, message: "password is required" }) 
        }
        if (!(password.length >= 8 && password.length <= 15)) { 
            return res.status(400).send({ status: false, message: "Password length should be 8 to 15 characters" }) 
        }
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password.trim()))) { 
            return res.status(400).send({ status: false, message: "please provide atleast one uppercase letter ,one lowercase, one character and one number " }) 
        }
        let securePassword = await bcrypt.hash(password, 4)
        data.password = securePassword

        let userCreated = await accountantModel.create(data);
        res.status(201).send({ status: true, message: "User created successfully", data: userCreated })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// Register Tax Payer Api
const createTaxPayer = async function(req, res) {
    try {
        let data = req.body;
        if (!validator.isValidRequestBody(data)) { 
            return res.status(400).send({ status: false, message: "Bad request, No data provided." }) 
        };
        let { fname, lname, email, phone, password } = data

        if (!validator.isValid(fname)) { 
            return res.status(400).send({ status: false, message: "fname is required" }) 
        }
        if (!validator.isValid(lname)) { 
            return res.status(400).send({ status: false, message: "lname is required" }) 
        }
        // Email validation
        if (!validator.isValid(email)) { 
            return res.status(400).send({ status: false, message: "email is required" }) 
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email.trim()))) { 
            return res.status(400).send({ status: false, message: "Please provide a valid email" }) 
        };
        let duplicateEmail = await taxPayerModel.findOne({ email: email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, message: 'Email is already exist' })
        }
        // Phone number Validation
        if (!validator.isValid(phone)) { 
            return res.status(400).send({ status: false, message: "phone is required" }) }
        if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone.trim()))) { return res.status(400).send({ status: false, message: "please provide a valid moblie Number" }) }
        let duplicateNumber = await taxPayerModel.findOne({ phone: phone })
        if (duplicateNumber) {
            return res.status(400).send({ status: false, message: 'Phone number is already exist' })
        }
        // Password Validation
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "password is required" }) 
        }
        if (!(password.length >= 8 && password.length <= 15)) { 
            return res.status(400).send({ status: false, message: "Password length should be 8 to 15 characters" }) 
        }
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password.trim()))) { 
            return res.status(400).send({ status: false, message: "please provide atleast one uppercase letter ,one lowercase, one character and one number " }) 
        }
        let securePassword = await bcrypt.hash(password, 4)
        data.password = securePassword

        let userCreated = await taxPayerModel.create(data);
        res.status(201).send({ status: true, message: "User created successfully", data: userCreated })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// Get All Tax Payer Details
const getAllTaxPayer = async function(req, res) {
    try {
        if (req.role == "Tax Payer") { 
            return res.status(403).send({ status: false, message: "You are not Authorised." }) 
        }
        const data = req.query
        data.isDeleted = false;
        const allTaxPayer = await taxPayerModel.find(data)
        if (allTaxPayer.length == 0) {
            return res.status(404).send({ status: false, message: "No tax payer Available." })
        }
        return res.status(200).send({ status: true, count: allTaxPayer.length, data: allTaxPayer });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


// Get Accountant By Id

const getAccountantById = async function(req, res) {
    try {
        if (req.role != "Tax Accountant") { 
            return res.status(403).send({ status: false, message: "You are not Authorised." }) 
        }
        const accountant = await accountantModel.findOne({ _id: req.params.id, isDeleted: false })
        if (accountant.length == 0) return res.status(404).send({ status: false, message: "No tax payer Available." })
        return res.status(200).send({ status: true, count: accountant.length, data: accountant });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


// Get Tax Payer By Id
const getTaxPayerById = async function(req, res) {
    try {

        if (req.taxPayerId != req.params.id) { 
            return res.status(403).send({ status: false, message: "You are not Authorised." }) 
        }
        const allTaxPayer = await taxPayerModel.findOne({ _id: req.params.id, isDeleted: false })
        if (allTaxPayer.length == 0) {
            return res.status(404).send({ status: false, message: "No tax payer Available." })
        }
        return res.status(200).send({ status: true, count: allTaxPayer.length, data: allTaxPayer });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



module.exports = {
    createAnotherAdmin,
    createAccountant,
    createTaxPayer,
    getAllTaxPayer,
    getTaxPayerById,
    getAccountantById
}