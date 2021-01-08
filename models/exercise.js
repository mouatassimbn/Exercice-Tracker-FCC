const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Exercise {
  constructor(userId, description, duration, date) {
    this.userId = userId;
    this.description = description;
    this.duration = duration;
    this.date = Date.parse(date);
  }

  save() {
    const db = getDb();
    return db
      .collection("exercises")
      .insertOne(this)
      .then((result) => console.log(result))
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

  static find(userId = "", from = "", to = "", limit = "") {
    const validUserId = userId || "";
    const validFrom = Date.parse(from) || "";
    const validTo = Date.parse(to) || "";
    const validLimit = limit || "";

    const db = getDb();

    db.collection("exercises").find({
      userId: validUserId,
      date: { $gt: validFrom, $lt: validTo },
      duration: validLimit,
    })
    .next()
    .then((exercise) => {
      return exercise;
    })
    .catch((err) => console.log(err));
  }
}

module.exports = Exercise;
