const express = require('express');
const mongoose = require("mongoose");
const app = express();

const dotenv = require("dotenv");
dotenv.config();


const {adminRouter} = require("./routes/adminRouter.js");
const {coursesRouter} = require("./routes/coursesRouter.js");
const {userRouter} = require("./routes/userRouter.js");

app.use(express.json());


app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/user", userRouter);


async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB");
    const port = process.env.PORT;
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`);
    })
}

main()