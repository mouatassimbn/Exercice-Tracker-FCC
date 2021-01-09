const Exercise = require("../models/exercise");
const User = require("../models/user");

exports.store = (req, res, nxt) => {
  const userId = req.body.userId;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;

  const exercise = new Exercise(userId, description, duration, date);

  exercise
    .save()
    .then((exercise) => {
      return User.findById(userId).then((user) => {
        return { ...exercise, username: user.username };
      });
    })
    .then((result) => {
      res.json({
        _id: result._id,
        username: result.username,
        date: result.date,
        duration: result.duration,
        description: result.description,
      });
    })
    .catch((err) => console.log(err));
};

exports.search = (req, res, nxt) => {
  const userId = req.query.userId;

  if (!userId) {
    res.json({
      error: "UserId is required...",
    });
  } else {
    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit;

    Exercise.find(userId, from, to, limit)
      .then((exercises) => {
        return User.findById(userId).then((user) => {
          return {
            ...user,
            count: exercises.length,
            log: exercises.map((exercise) => {
              return {
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date,
              };
            }),
          };
        });
      })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  }
};
