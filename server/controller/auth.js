// import User from "./../model/user";
const User = require("./../model/user");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (err, data) => {
    if (data) return res.status(400);

    const hash_password = await bcrypt.hash(req.body.password, 10);

    let _user = new User({
      hash_password,
      username: req.body.username,
    });

    _user.save((error, data) => {
      if (error) return res.status(400).json({ error });
      if (data) {
        const token = jwt.sign({ _id: data._id }, "helloWorld", {
          expiresIn: "1d",
        });
        return res.status(200).json({ data, token });
      }
    });
  });
};


exports.signIn = async (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (err, data) => {
    if (err) return res.status(400).json({ error: err });
    if (data) {

      const authenticate = await data.authenticate(req.body.password);
      if (authenticate) {
        const token = jwt.sign({ _id: data._id }, "helloWorld", {
          expiresIn: "1d",
        });
        let newData = {
          _id: data._id,
          username: data.username,
          role: data.role,
        };
        return res.status(200).json({
          data: newData,
          token,
        });
      }
    }
  });
};
