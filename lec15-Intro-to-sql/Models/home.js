const db = require("../utils/db");

class Home {
  constructor(name, price, location, rating, photoUrl, description, id) {
    this.name = name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  static fetchAll(callback) {
    return db.execute("select * from homes");
  }

  save() {
    if (this.id) {
      return db.execute(
        "UPDATE HOMES SET name = ?, price = ?, location=?, imageUrl = ?, description = ? WHERE id = ? ",
        [
          this.name,
          this.price,
          this.location,
          this.photoUrl,
          this.description,
          this.id,
        ],
      );
    } else {
      return db.execute(
        "INSERT into HOMES (name,price,location,imageUrl,description) VALUES(?,?,?,?,?)",
        [this.name, this.price, this.location, this.photoUrl, this.description],
      );
    }
  }
  static findHomeById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);
  }

  static deleteHomeById(homeId) {
    return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
  }
}

exports.Home = Home;
