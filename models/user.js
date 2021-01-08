const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(username) {
    this.username = username;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static findById(userId) {
    const db = getDb();

    db.collection("users")
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();

    db.collection("users")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }
  
}

module.exports = User;
