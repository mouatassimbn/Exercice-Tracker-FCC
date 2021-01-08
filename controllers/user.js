const User = require("../models/user");

exports.store = (req, res, nxt) => {
  const username = req.body.username;

  const user = new User(username);

  user
    .save()
    .then((result) => {
      res.json({
        username: result.username,
        _id: result._id,
      });
    })
    .catch((err) => console.log(err));
};
