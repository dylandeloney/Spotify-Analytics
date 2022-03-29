const express = require("express");
const authRouter = require("./routes/auth");

const app = express();
app.use(express.json());

//Use Routes
app.use("/", authRouter);

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
