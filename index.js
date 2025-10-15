const express = require("express")

const empRoutes = require("./routes/emp")
const userRoutes = require("./routes/user")
const mongoose = require("mongoose")
const app = express()

const DB_CONNECTION_STRING = "mongodb+srv://blackmagejr1_db_user:8Zl7vF9h24pNBoKT@cluster0.nj4hbzc.mongodb.net/101487100_COMP3123_Assignment1?retryWrites=true&w=majority&appName=Cluster0"
const SERVER_PORT = process.env.SERVER_PORT || 3001

app.use(express.json())
app.use(express.urlencoded())


app.use("/api/v1/emp", empRoutes)
app.use("/api/v1/user", userRoutes)


app.route("/")
    .get((req, res) => {
        res.send("<h1>101487100_COMP3123_Assignment1</h1>")
    })

mongoose.connect(DB_CONNECTION_STRING)
    .then(() =>{
        console.log("Connected to MongoDB")
        app.listen(SERVER_PORT, () =>{
            console.log(`Server running at http://localhost:${SERVER_PORT}/`)
        })
    })
    .catch((err) =>{
        console.log("Error connecting to MongoDb:",err.message)
    })
