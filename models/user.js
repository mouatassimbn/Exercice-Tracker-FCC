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
}

module.exports = User;
