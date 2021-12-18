const express = require("express")
const app = express()
const StudentRouter = require("./Routers/StudentRouter")

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
app.use("/student", StudentRouter)