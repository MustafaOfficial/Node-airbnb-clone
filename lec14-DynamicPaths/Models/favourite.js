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
      console.log("Favourites.json reading complete", error);
      callback(!error ? JSON.parse(data) : []);
    });
  }

  // static removeFromFavoritesById(homeId) {
  //   console.log(" Favourite.removeFromFavoritesById() called");
  //   Favourite.getFavourites((favourites) => {
  //     const updatedFavourites = favourites.filter((favoriteHomeId) => {
  //       return homeId != favoriteHomeId;
  //     });
  //     fs.writeFile(filePath, JSON.stringify(updatedFavourites), (err) => {
  //       if (err) {
  //         console.log(err);
  //         return;
  //       }
  //     });
  //   });
  // }

  static removeFromFavoritesById(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      const updatedFavourites = favourites.filter((favoriteHomeId) => {
        return homeId != favoriteHomeId;
      });

      fs.writeFile(filePath, JSON.stringify(updatedFavourites), callback);
    });
  }
}

exports.Favourite = Favourite;
