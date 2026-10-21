const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/rootPathUtil");

//fake database
// let addedHomes = [];

class Home {
  constructor(name, price, location, rating, photoUrl) {
    this.name = name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
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

  static fetchAll(callback) {
    const filePath = path.join(rootDir, "data", "homes.json");
    fs.readFile(filePath, (error, data) => {
      console.log("File reading complete", error);
      callback(!error ? JSON.parse(data) : []);
    });
  }
}

exports.Home = Home;
// exports.addedHomes = addedHomes;
