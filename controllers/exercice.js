const Exercise = require("../models/exercise");

exports.store = (req, res, nxt) => {
  const userId = req.body.usreId;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;

  const exercise = new Exercise(userId, description, duration, date);

  exercise
    .save()
    .then((exercise) => {
      res.json({
        _id: exercise._id,
        username: exercise.username,
        date: exercise.date,
        duration: exercise.duration,
        description: exercise.description,
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
  }

  const from = req.query.from;
  const to = req.query.to;
  const limit = req.query.limit;
  
  Exercise.find(userId, from, to, limit)
    .then((exercises) => {
      res.json(exercises);
    })
    .catch((err) => console.log(err));
};
