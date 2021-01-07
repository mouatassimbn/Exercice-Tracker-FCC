require("dotenv").config();
const mongoDb = require("mongodb");
const mongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  mongoClient
    .connect(process.env.CONNECTIONSTRING)
    .then((client) => {
        _db = client.db();
        callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
    if(_db){
        return _db;
    }

    throw "No Database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;