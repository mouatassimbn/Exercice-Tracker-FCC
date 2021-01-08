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
