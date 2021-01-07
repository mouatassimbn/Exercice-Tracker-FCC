const getDb = require("../util/database").getDb;

class Exercise {
  constructor(userId, description, duration, date) {
    this.userId = userId;
    this.description = description;
    this.duration = duration;
    this.date = date;
  }

  save() {
    const db = getDb();
    return db
      .collection("exercises")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
}

module.exports = Exercise;
