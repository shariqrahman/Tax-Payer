const express = require("express")
const router = express.Router()
const { authAdmin, authAccountant, authTaxPayer } = require("../middlware/auth")
const { createAnotherAdmin, createAccountant, createTaxPayer, getAllTaxPayer, getTaxPayerById, getAccountantById } = require("../controller/userController")
const loginController = require("../controller/loginController")
const { taxPay, editTaxPayer, getTaxDetailsById, getTaxDetailsFilter } = require("../controller/taxController")


// Default Admin: {
//     "_id": "62bc4451cf88681c86fac41e",
//     "email" : "shariqrahman@gmail.com",
//     "password" : "Shariq123@#"
// }

router.post('/registerAdmin', authAdmin, createAnotherAdmin)

router.post('/registerAccountant', authAdmin, createAccountant)
router.post('/registerTaxPayer', createTaxPayer)
router.get('/getAllTaxPayer', authAdmin, getAllTaxPayer)
router.get('/getTaxPayerById/:id', authTaxPayer, getTaxPayerById)
router.get('/getAccountantById/:id', authAccountant, getAccountantById)

router.post('/taxPay/:id', authTaxPayer, taxPay)
router.put('/updateTaxData', authAdmin, authAccountant, editTaxPayer)
router.get('/getTaxDetailsById/:id', authTaxPayer, getTaxDetailsById)
router.get('/getTaxDetailsFilter', authAdmin, authAccountant, getTaxDetailsFilter)

router.post('/login', loginController.login)


module.exports = router
