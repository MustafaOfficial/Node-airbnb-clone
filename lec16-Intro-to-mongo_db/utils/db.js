const mongdb = require("mongodb");
const MongoClient = mongdb.MongoClient;

const MONGO_URL = "mongodb+srv://root:root@homescluster.xwndjiz.mongodb.net/";

let _db;

exports.connectToMongoDB = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      // console.log(client);
      _db = client.db("airbnb");
      callback(client);
    })
    .catch((err) => {
      console.log("Error while connecting to mongoDB", err);
    });
};

exports.getDb = () => {
  if (!_db) {
    throw new Error("_db is null");
  } else {
    return _db;
  }
};

// exports.connectToMongoDB = connectToMongoDB;
