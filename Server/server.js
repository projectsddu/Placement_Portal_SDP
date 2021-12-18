const express = require("express")
const app = express()
const router = require("./Routers/StudentRouter")
const Company = require("./Routers/CompanyRouter")

// Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing API
app.get("/", (req, res) => {
    res.send("Workig all right!")
})

const port = 8000

app.listen(port, () => {
    console.log("Server is running on port 8000")
})

//routers
app.use("/student", router)
app.use("/company", Company)