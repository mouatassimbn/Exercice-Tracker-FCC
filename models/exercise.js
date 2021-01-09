const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Exercise {
  constructor(userId, description, duration, date) {
    this.userId = userId;
    this.description = description;
    this.duration = duration;
    this.date = new Date(date);
  }

  save() {
    const db = getDb();
    return db
      .collection("exercises")
      .insertOne(this)
      .then((result) => {
        return result.ops[0];
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection("exercises")
      .find()
      .toArray()
      .then((exercises) => {
        return exercises;
      })
      .catch((err) => console.log(err));
  }

  static findById(exeId) {
    const db = getDb();

    db.collection("exercises")
      .find({ _id: new mongodb.ObjectId(exeId) })
      .next()
      .then((exercise) => {
        return exercise;
      })
      .catch((err) => console.log(err));
  }

  static findByUserId(userId) {
    const db = getDb();

    db.collection("exercises")
      .find({ userId: userId })
      .next()
      .then((exercise) => {
        return exercise;
      })
      .catch((err) => console.log(err));
  }

  static find(userId, from = "", to = "", limit = 0) {
    let filter = { userId: userId };
    let validLimit = Number.parseInt(limit) || 0;

    if (from || to) {
      filter.date = {};

      if (from) {
        filter.date.$gte = new Date(from);
      }

      if (to) {
        filter.date.$lte = new Date(to);
      }
    }

    const db = getDb();

    return db
      .collection("exercises")
      .find(filter)
      .limit(validLimit)
      .toArray()
      .then((exercises) => {
        return exercises;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Exercise;
