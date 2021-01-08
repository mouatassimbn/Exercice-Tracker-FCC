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

  static find(userId, from = "", to = "", limit = "") {
    const validFrom = new Date(from) || null;
    const validTo = new Date(to) || null;
    const validLimit = limit || null;

    const db = getDb();

    db.collection("exercises").find({
      userId: userId,
      date: { $gt: validFrom, $lt: validTo },
      duration: validLimit,
    })
    .toArray()
    .then((exercises) => {
      return exercises;
    })
    .catch((err) => console.log(err));
  }
}

module.exports = Exercise;
