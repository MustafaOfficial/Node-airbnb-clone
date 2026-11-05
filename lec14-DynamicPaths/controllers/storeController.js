const { Favourite } = require("../Models/favourite");
const { Home } = require("../Models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((addedHomes) => {
    res.render("store/index", {
      addedHomes: addedHomes,
      title: "index",
      currentPage: "index",
    });
  });
};

exports.getHome = (req, res, next) => {
  Home.fetchAll((addedHomes) => {
    res.render("store/home-list", {
      addedHomes: addedHomes,
      title: "BNB HOME",
      currentPage: "home",
    });
  });
};

// exports.getFavourites = (req, res) => {
//   console.log("geFavourites() CAlled");

//   let favouriteHomes = [];
//   Favourite.getFavourites((favourites) => {
//     console.log("FAv Homes: ", favourites);

//     Home.fetchAll((addedHomes) => {
//       console.log("All Homes: ", addedHomes);

//       favouriteHomes = addedHomes.filter((home) => {
//         return favourites.includes(home.id);
//       });
//       console.log(favouriteHomes);
//       res.render("store/favourites", {
//         favouriteHomes: favouriteHomes,
//         title: "favourites",
//         currentPage: "favourites",
//       });
//     });
//   });
// };

exports.postAddToFavourites = (req, res) => {
  const homeId = req.body.id;

  Favourite.addToFavourite(homeId, (error) => {
    if (error) {
      console.log("Error while marking favourite:", error);
    }

    res.redirect("/favourites");
  });
};

exports.getBookings = (req, res) => {
  Home.fetchAll((addedHomes) => {
    res.render("store/bookings", {
      addedHomes: addedHomes,
      title: "Bookings",
      currentPage: "bookings",
    });
  });
};

exports.getHomeDetail = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findHomeById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/home");
    } else {
      console.log(home);
      res.render("store/home-detail", {
        home,
        homeId,
        title: "Home Detail",
        currentPage: "home",
      });
    }
  });
};

exports.getFavourites = (req, res) => {
  let favouriteHomes = [];
  Favourite.getFavourites((favourites) => {
    // console.log("FAv Homes: ", favourites);

    Home.fetchAll((addedHomes) => {
      // console.log("All Homes: ", addedHomes);

      addedHomes.forEach((home) => {
        favourites.forEach((favHomeId) => {
          if (home.id == favHomeId) {
            favouriteHomes.push(home);
            // console.log("favouriteHomes INside inner map:", favouriteHomes);
          }
        });
      });
      // console.log(favouriteHomes);
      res.render("store/favourites", {
        favouriteHomes: favouriteHomes,
        title: "favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postRemoveFromFavorites = (req, res, next) => {
  console.log(" postRemoveFromFavorites() called");

  const homeId = req.params.homeId;

  Favourite.removeFromFavoritesById(homeId, (err) => {
    if (err) {
      console.log("error removing home from favourites");
      res.redirect("/favourites");
    }
  });
};
