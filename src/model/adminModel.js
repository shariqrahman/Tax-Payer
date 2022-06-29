const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'Admin',
            enum : ["Admin","Tax Accountant","Tax Payer"]
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("admin", adminSchema);