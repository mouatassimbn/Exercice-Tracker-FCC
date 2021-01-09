const User = require("../models/user");

exports.store = (req, res, nxt) => {
  const username = req.body.username;
  const user = new User(username);

  user
    .save()
    .then((user) => {
      res.json({
        username: user.username,
        _id: user._id,
      });
    })
    .catch((err) => console.log(err));
};

exports.index = (req, res, nxt) => {
  User.fetchAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};
