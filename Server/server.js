const express = require("express")
const app = express()

const StudentRouter = require("./Routers/StudentRouter")
const AnnoucementRouter = require("./Routers/AnnoucementRouter")
const CompanyRouter = require("./Routers/CompanyRouter")
const StudentPlacementRouter = require("./Routers/StudentPlacementRouter")
const StudentInternshipRouter = require("./Routers/StudentInternshipRouter")

// Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing API
app.get("/", (req, res) => {
    res.send("Workig all right!")
})
app.post("/postTest", (req, res) => {
    res.send(req.body)
})

const port = 8000

app.listen(port, () => {
    console.log("Server is running on port 8000")
})

//routers

app.use("/student", StudentRouter)
app.use("/annoucement", AnnoucementRouter)
app.use("/company", CompanyRouter)
app.use("/studentplacement", StudentPlacementRouter)
app.use("/studentinternship", StudentInternshipRouter)