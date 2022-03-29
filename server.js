const express = require("express");
const authRouter = require("./routes/auth");
const path = require("path");

const app = express();
app.use(express.json());

//Use Routes
app.use("/", authRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
