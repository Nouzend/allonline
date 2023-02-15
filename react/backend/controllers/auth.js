const connection = require("../services/databast");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE_TIMEOUT } = require("../config/constants");

export const register = async (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;

  const user = await connection.query(
    "SELECT * FROM `7-11all`.users WHERE Email = ?",
    [Email]
  );

  if (user[0].length > 0) {
    return res.status(400).send({ message: "Email is already taken." });
  }

  const hashedPwd = await bcrypt.hash(Password, 10);
  await connection.query(
    "INSERT INTO users (Email, password, role) VALUES (?, ?, 'user')",
    [Email, hashedPwd]
  )
  res.status(200).send("Register successful.");
};

const login = async (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;

  const [users] = await connection.query(
    "SELECT * FROM 7-11all.users WHERE Email = ?",
    [Email]
  );

  if (users.length === 0) {
    return res
      .status(403)
      .send({ message: "Username or password is incorrect." });
  }

  const same = await bcrypt.compare(Password, users[0].password);

  if (!same) {
    return res
      .status(403)
      .send({ message: "Username or password is incorrect." });
  }

  const payload = { id: users[0].id, role: users[0].role };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE_TIMEOUT,
  });
  res.status(200).send({ message: "success", token: token });
};

module.exports = {
  register,
  login,
};
