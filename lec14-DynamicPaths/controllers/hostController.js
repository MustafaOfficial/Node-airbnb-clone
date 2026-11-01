const { Home } = require("../Models/home");
const { addedHomes } = require("../Models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", { title: "Add Home", currentPage: "addHome" });
};

exports.getHostHomeList = (req, res, next) => {
  Home.fetchAll((addedHomes) => {
    res.render("host/host-home-list", {
      addedHomes: addedHomes,
      title: "BNB HOME",
      currentPage: "home",
    });
  });
};

// const addedHomes = [];

exports.postAddHome = (req, res, next) => {
  const { name, price, location, rating, photoUrl } = req.body;
  const home = new Home(name, price, location, rating, photoUrl);
  home.save();

  res.render("host/homeAdded", {
    addedHome: req.body,
    title: "Home Added",
    currentPage: "homeAdded",
  });
  console.log(req.body);
  console.log(addedHomes);
};

// exports.addedHomes = addedHomes;
