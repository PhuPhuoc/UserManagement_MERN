const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/users");

const app = express();
const PORT = process.env.port || 5000;

// get connection with db
const URI = 'mongodb+srv://blessforwork:turndownforwhat2905@usermanagementcluster.x9koo5i.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(URI).then(() => {
    console.log("=> Connected to database on cloud");
    app.listen(PORT, () => {
        console.log(`=> Server is listening on port ${PORT} ...`);
    });
}).catch((error) => {
    console.log(">> CAN NOT connect to DB: " + error + " <<");
});
app.use(bodyParser.json("50mb"));
app.use(cors());
app.use(morgan("common"));

// router
app.use("/v1/user", userRouter);
// other
app.all("*", (req, res) => {res.send("That route does not support!")});