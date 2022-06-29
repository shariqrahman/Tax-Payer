const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const route = require("./route/route.js")

const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://amir-thorium:NSE7ZdUlu4no9WRF@cluster0.gchuo.mongodb.net/ProjectTaxPayer?authSource=admin&replicaSet=atlas-cw2o95-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", {
    useNewUrlParser: true 
})
.then(() => console.log("MongoDB is connected"))
.catch((err) => console.log(err))

app.use("/", route)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on 3000 port")
})