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
      console.log("File reading complete", error);
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
        console.log("FIle writing complete", error);
      });
    });
  }

  static findHomeById(homeId, callback) {
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
      fs.writeFile(filePath, JSON.stringify(homes), (error) => {
        console.log("File writing complete", error);
      });
      callback();
    });
  }
}

exports.Home = Home;
// exports.addedHomes = addedHomes;
