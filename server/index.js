const PORT = 3001;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// routes
const userRoute = require("./routes/user");

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
