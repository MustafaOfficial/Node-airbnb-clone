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

exports.getFavourites = (req, res) => {
  Home.fetchAll((addedHomes) => {
    res.render("store/favourites", {
      addedHomes: addedHomes,
      title: "favourites",
      currentPage: "favourites",
    });
  });
};

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
