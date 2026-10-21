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

exports.getFavorites = (req, res) => {
  Home.fetchAll((addedHomes) => {
    res.render("store/home-list", {
      addedHomes: addedHomes,
      title: "favourites",
      currentPage: "favourites",
    });
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
