const Favourite = require("../Models/favourite");
const Home = require("../Models/home");

exports.getIndex = (req, res, next) => {
  res.render("store/index", {
    addedHomes: {},
    title: "index",
    currentPage: "index",
  });
};

exports.getHome = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("store/home-list", {
      addedHomes: homes,
      title: "BNB HOME",
      currentPage: "home",
    });
  });
};

exports.postAddToFavourites = (req, res) => {
  const homeId = req.body.id;

  const fav = new Favourite({ homeId });
  fav
    .save()
    .then((result) => {
      console.log("Home Added To Favourites", result);
    })
    .catch((error) => {
      console.log("Error while marking favourite:", error);
    })
    .finally(() => {
      res.redirect("/home");
    });
};

exports.getBookings = (req, res) => {
  Home.find().then((homes) => {
    res.render("store/bookings", {
      addedHomes: homes,
      title: "Bookings",
      currentPage: "bookings",
    });
  });
};

exports.getHomeDetail = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findOne({ _id: homeId }).then((home) => {
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

exports.getFavourites = async (req, res) => {
  console.log("StoreController.getFavourites called");
  let favouriteHomes = await Favourite.find().populate("homeId");
  await console.log("Favourite homes: ", favouriteHomes);
  res.render("store/favourites", {
    favouriteHomes: favouriteHomes,
    title: "favourites",
    currentPage: "favourites",
  });

  // then((favourites) => {
  //   favourites = favourites.map((fav) => fav.homeId.toString());
  //   Home.find().then((homes) => {
  //     homes.forEach((home) => {
  //       favourites.forEach((favHomeId) => {
  //         if (home._id.toString() === favHomeId) {
  //           favouriteHomes.push(home);
  //         }
  //       });
  //     });

  //   });
  // });
};

exports.postRemoveFromFavorites = (req, res, next) => {
  console.log(" postRemoveFromFavorites() called");

  const homeId = req.params.homeId;

  Favourite.findOneAndDelete({ homeId })
    .then((result) => {
      console.log("Home Removed from Favourites", result);
    })
    .catch(() => {
      console.log("error removing home from favourites");
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};
