const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const adminModel = require("../model/adminModel")
const taxPayerModel = require("../model/taxPayerModel")
const accountantModel = require("../model/accountantModel")
const validator = require("../validator/validator")

const login = async function (req, res) {
    try {
        const data = req.body
        let { email, password } = data

        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Bad Request, No data provided" })
        }
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: "Email is required" })
        }
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is required" })
        };

        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email.trim()))) {
            return res.status(400).send({ status: false, message: "Please enter a valid Email." })
        };
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password))) {
            return res.status(400).send({ status: false, message: "please provide a valid password with one uppercase letter ,one lowercase, one character and one number " })
        }


        const adminMatch = await adminModel.findOne({ email: email })
        let id, checkPass, checkUser;
        if (adminMatch) {
            id = adminMatch._id;
            checkPass = adminMatch.password
            checkUser = await bcrypt.compare(password, checkPass)
            if (checkUser == false) {
                return res.status(400).send({ status: false, message: "Email or Password is incorrect" })
            }
            const token = jwt.sign({ adminId: id,role:adminMatch.role }, "secret-key", { expiresIn: "2h" })
            return res.status(200).send({ status: true, msg: "You are successfully logged in", id: id, token })
        }
        else {
            const accountantMatch = await accountantModel.findOne({ email: email })
            if (accountantMatch) {
                id = accountantMatch._id;
                checkPass = accountantMatch.password;
                checkUser = await bcrypt.compare(password, checkPass)
                if (checkUser == false) {
                    return res.status(400).send({ status: false, message: "Email or Password is incorrect" })
                }
                const token = jwt.sign({ accountantId: id,role:accountantMatch.role }, "secret-key", { expiresIn: "2h" })
                return res.status(200).send({ status: true, message: "You are successfully logged in", id: id, token })
            }
            else {
                const taxPayerMatch = await taxPayerModel.findOne({ email: email })
                if (taxPayerMatch) {
                    id = taxPayerMatch._id;
                    checkPass = taxPayerMatch.password
                    checkUser = await bcrypt.compare(password, checkPass)
                    if (checkUser == false) return res.status(400).send({ status: false, msg: "Email or Password is incorrect" })
                    const token = jwt.sign({ taxPayerId: id,role:taxPayerMatch.role }, "secret-key", { expiresIn: "2h" })
                    return res.status(200).send({ status: true, message: "You are successfully logged in", id: id, token })
                }
                else {
                    return res.status(400).send({ status: false, message: "Email or Password is incorrect" })
                }
            }
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

module.exports.login = login