const jwt = require("jsonwebtoken");

const authAdmin = async function (req, res, next) {
    try {
        let token = req.headers["x-api-token"];
        if (!token) return res.status(400).send({ status: false, message: "login is required, Set a header" })

        let decodedtoken = jwt.verify(token, "secret-key")
        if (!decodedtoken) return res.status(400).send({ status: false, message: "token is invalid" })

        req.adminId = decodedtoken.adminId
        req.role = decodedtoken.role
        next();
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}


const authAccountant = async function (req, res, next) {
    try {
        let token = req.headers["x-api-token"];
        if (!token) return res.status(400).send({ status: false, message: "login is required, Set a header" })

        let decodedtoken = jwt.verify(token, "secret-key")
        if (!decodedtoken) return res.status(400).send({ status: false, message: "token is invalid" })

        req.accountantId = decodedtoken.accountantId
        req.role = decodedtoken.role
        next();
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}


const authTaxPayer = async function (req, res, next) {
    try {
        let token = req.headers["x-api-token"];
        if (!token) return res.status(400).send({ status: false, message: "login is required, Set a header" })

        let decodedtoken = jwt.verify(token, "secret-key")
        if (!decodedtoken) return res.status(400).send({ status: false, message: "token is invalid" })

        req.taxPayerId = decodedtoken.taxPayerId
        req.role = decodedtoken.role
        next();
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

module.exports = {
    authAdmin,
    authAccountant,
    authTaxPayer
}