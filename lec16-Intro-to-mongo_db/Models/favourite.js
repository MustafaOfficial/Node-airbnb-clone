const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/db");

class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  addToFavourite() {
    const db = getDb();

    return db
      .collection("favourites")
      .findOne({ homeId: this.homeId })
      .then((existingFavourite) => {
        if (existingFavourite) {
          throw new Error("Home Already Marked Favourite");
        }

        return db.collection("favourites").insertOne(this);
      });
  }

  // addToFavourite() {
  //   const db = getDb();
  //   return Favourite.getFavourites()
  //     .then((favourites) => {
  //       if (favourites.includes(this.homeId)) {
  //         throw new Error("Home Already Marked Favourite");
  //       } else {
  //         return db.collection("favourites").insertOne(this);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // static addToFavourite(homeId, callback = () => {}) {
  //   Favourite.getFavourites((favourites) => {
  //     // addedHomes.push(this);
  //     if (favourites.includes(homeId)) {
  //       callback("Home is already added to favourites");
  //     } else {
  //       return db.collection("favourites").insertOne(homeId);
  //     }
  //   });
  // }

  static getFavourites() {
    console.log("Favourites.getFavourites called");

    const db = getDb();
    return db.collection("favourites").find().toArray();
  }

  static removeFromFavoritesById(homeId) {
    const db = getDb();
    return db.collection("favourites").deleteOne({ homeId: homeId });
  }
}

exports.Favourite = Favourite;
