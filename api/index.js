const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const cookieParser = require("cookie-parser");
const User = require("./models/User");

require("dotenv").config();

const app = express();
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(cookieParser());
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

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const foundUser = await User.findOne({ email });
	if (foundUser) {
		const passok = bcrypt.compareSync(password, foundUser.password);
		if (passok) {
			jwt.sign(
				{ email: foundUser.email, id: foundUser._id },
				jwtSecret,
				{},
				(err, token) => {
					if (err) throw err;
					res.cookie("token", token).json(foundUser);
				}
			);
		} else {
			res.status(422).json({ alert: "Invalid password" });
		}
	} else {
		res.status(404).json({ alert: "User not found" });
	}
});

app.post("/logout", (req, res) => {
	res.clearCookie("token").json({ message: "Logout Successful" });
})

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

app.get("/profile", (req, res) => {
	const { token } = req.cookies;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, userData) => {
			if (err) throw err;
			const { name, email, _id } = await User.findById(userData.id);
			res.json({ name, email, _id });
		});
	} else {
		res.json(null);
	}
});

app.post('/upload-by-link', async (req, res) => {
	const {link}=req.body;
	const newName = 'photo'+Date.now()+'.jpg';
	await imageDownloader.image({
		url: link,
		dest: __dirname+'/uploads/'+newName
	});
	res.json(newName);
})

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});
