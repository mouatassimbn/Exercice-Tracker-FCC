require("dotenv").config();
const mongoDb = require("mongodb");
const mongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  let connectionString  = process.env.CONNECTIONSTRING || null;

  if(!connectionString) {
    throw "[ERROR] : Database connection string is empty...";
  }
  
  mongoClient
    .connect()
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

    throw "[ERROR] : No Database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;