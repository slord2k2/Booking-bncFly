const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

require("dotenv").config();

const app = express();
const secret = process.env.SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
	res.json("test ok");
});

app.post("/signup", async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ alert: "Email already taken, Please Login" });
		}
		const newUser = await User.create({
			name,
			email,
			password: bcrypt.hashSync(password, bcryptSalt),
		});
		res.json({ message: "User created successfully, Please Login" });
	} catch (err) {
		res.status(500).json({ alert: "Something went wrong" });
	}
});

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});
