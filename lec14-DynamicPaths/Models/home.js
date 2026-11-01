const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/rootPathUtil");

//fake database
// let addedHomes = [];

class Home {
  id = Math.random();

  constructor(name, price, location, rating, photoUrl) {
    this.name = name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  static fetchAll(callback) {
    const filePath = path.join(rootDir, "data", "homes.json");
    fs.readFile(filePath, (error, data) => {
      console.log("File reading complete", error);
      callback(!error ? JSON.parse(data) : []);
    });
  }

  save() {
    Home.fetchAll((addedHomes) => {
      addedHomes.push(this);
      const filePath = path.join(rootDir, "data", "homes.json");
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
}

exports.Home = Home;
// exports.addedHomes = addedHomes;
