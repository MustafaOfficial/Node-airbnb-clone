const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/db");

class Home {
  constructor(name, price, location, rating, photoUrl, description, _id) {
    this.name = name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  save() {
    const db = getDb();

    if (this._id) {
      // Update case
      const updatedHome = {
        name: this.name,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description,
      };

      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updatedHome },
        );
    } else {
      // Insert case
      return db.collection("homes").insertOne(this);
    }
  }
  static findHomeById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteHomeById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
}

exports.Home = Home;
