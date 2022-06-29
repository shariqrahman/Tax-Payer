const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const taxSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        unique: true,
        ref: 'taxPayer'
    },
    totalSales: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    CGST: {
        type: Number
    },
    SGST: {
        type: Number
    },
    taxSlab: {
        type: Number,
        enum: [5, 12, 18, 28]
    },
    totalTax: {
        type: Number
    },
    taxStatus: {
        type: String,
        enum: ['InProcess','Paid', 'Delayed'],
        default: 'InProcess'
    },
    taxDue: {
        type: String,
        enum: ["New","Delayed"],
        default : "New"
    }
}, { timestamps: true })


module.exports = new mongoose.model('tax', taxSchema)