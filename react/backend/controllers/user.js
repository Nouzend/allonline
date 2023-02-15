const connection = require("../services/databast");
const bcrypt = require("bcrypt");
const editMyProfileById = async (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  await connection.query(
    "UPDATE `users` SET `Email` = ?, `Password` = ?;",
    [Email, Password]
  );
  res.status(200).send({ message: "Your profile has been updated." });
};

const editMyPasswordById = async (req, res) => {
  const Password = req.body.Password;
  const hashPwd = await bcrypt.hash(Password, 10);
  await connection.query(
    "UPDATE `users` SET `password` = ? ",
    [hashPwd]
  );
  res.status(200).send({ message: "Your password has been updated." });
};

const getMyProfile = async (req, res) => {
  const id = req.user.id;
  const [users] = await connection.query("SELECT * FROM users where id = ?", [
    id,
  ]);
  res.status(200).send(users);
};

module.exports = {
  editMyProfileById,
  editMyPasswordById,
  getMyProfile,
};
