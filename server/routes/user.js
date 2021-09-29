const express = require("express");
const router = express.Router();
const { signup, login, logout, isAuth } = require("../controllers/user");

router.post("/signup", signup);

router.post("/login", login);

router.post("/is-auth", isAuth);

router.get("/logout", logout);

module.exports = router;
