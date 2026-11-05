const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/rootPathUtil");

//fake database
// let addedHomes = [];
const filePath = path.join(rootDir, "data", "homes.json");

class Home {
  constructor(name, price, location, rating, photoUrl) {
    this.name = name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (error, data) => {
      console.log("Home.json reading complete", error);
      callback(!error ? JSON.parse(data) : []);
    });
  }

  save() {
    Home.fetchAll((addedHomes) => {
      if (this.id) {
        addedHomes = addedHomes.map((home) =>
          this.id === home.id ? this : home,
        );
      } else {
        this.id = Math.random().toString();
        addedHomes.push(this);
      }
      fs.writeFile(filePath, JSON.stringify(addedHomes), (error) => {
        console.log("Home.json writing complete aftere save()", error);
      });
    });
  }
  //Passing default callback i
  // err && console.log(err) uses short-circuit evaluation:
  // If err is null (success), null && ... stops right there, so nothing is logged. (null is falsy, so null && console.log(err) stops at null and never calls console.log.)
  // If err is an Error object (failure), it’s truthy, so the right side runs and logs it.
  static findHomeById(homeId, callback = (err) => err && console.log(err)) {
    this.fetchAll((homes) => {
      const homeFound = homes.find(
        (home) => String(home.id) === String(homeId),
      );
      callback(homeFound);
    });
  }

  static deleteHomeById(homeId, callback) {
    Home.fetchAll((homes) => {
      homes = homes.filter((home) => {
        return String(home.id) !== String(homeId);
      });
      fs.writeFile(filePath, JSON.stringify(homes), (callback = () => {}));
    });
  }
}

exports.Home = Home;
// exports.addedHomes = addedHomes;
