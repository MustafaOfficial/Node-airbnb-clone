const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/rootPathUtil");

const filePath = path.join(rootDir, "data", "favourites.json");

class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      // addedHomes.push(this);
      if (favourites.includes(homeId)) {
        callback("Home is already added to favourites");
      } else {
        favourites.push(homeId);
        fs.writeFile(filePath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(filePath, (error, data) => {
      console.log("File reading complete", error);
      callback(!error ? JSON.parse(data) : []);
    });
  }
}

exports.Favourite = Favourite;
