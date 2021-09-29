const db = require("../db/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [row, fields] = await db
      .promise()
      .execute("SELECT * FROM USERS WHERE email = ?", [email]);

    if (row.length !== 0) {
      res.status(409).end();
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await db
      .promise()
      .execute("INSERT INTO users (email, password) values(?, ?)", [
        email,
        hashedPassword,
      ]);

    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.json({ message: "Error creating user." }).status(500).end();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [account, fields] = await db
      .promise()
      .execute("SELECT * FROM users WHERE email = ?", [email]);

    if (account.length === 0) {
      res.status(400).end();
      return;
    }

    const match = await bcrypt.compare(password, account[0].password);

    if (match) {
      const id = account[0].id;

      jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: 300 },
        (err, token) => {
          if (err) {
            console.log(err);
            res.status(500).end();
            return;
          }

          res
            .status(200)
            .cookie("userToken", token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 10,
            })

            .json(account[0])
            .end();
          return;
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const logout = async (req, res) => {
  res
    .status(200)
    .cookie("userToken", false, { httpOnly: true, maxAge: 10 })
    .end();
};

const isAuth = (req, res, next) => {
  const { userToken } = req.cookies;

  if (userToken) {
    jwt.verify(userToken, process.env.JWT_SECRET, async (err, token) => {
      if (err) {
        console.log(err);
        return;
      }

      const user = await db
        .promise()
        .execute("SELECT * FROM users WHERE id = ?", [token.id]);
      res.status(200).json(user[0]).end();
    });
  } else {
    res.status(401).end();
    next();
  }
};

module.exports = { signup, login, logout, isAuth };
