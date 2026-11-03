const { Home } = require("../Models/home");
const { addedHomes } = require("../Models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    title: "Add Home",
    currentPage: "addHome",
    editing: false,
  });
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

exports.postDeleteHome = (req, res, next) => {
  let homeId = req.params.homeId;
  Home.deleteHomeById(homeId, (error) => {
    console.log("Error while deleting: ", error);
  });
  res.redirect("/host/host-home-list");
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

exports.postEditHome = (req, res, next) => {
  const { id, name, price, location, rating, photoUrl } = req.body;
  const home = new Home(name, price, location, rating, photoUrl);
  // home.id = this.id;
  home.id = id;
  home.save();

  res.redirect("/host/host-home-list");
  console.log(req.body);
  console.log(addedHomes);
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  console.log(homeId, editing);

  Home.findHomeById(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("host/host-home=list");
    }

    res.render("host/edit-home", {
      editing: editing,
      home: home,
      title: "Edit Home",
      currentPage: "edit-home",
    });
    console.log(req.body);
    console.log(addedHomes);
  });
};

// exports.addedHomes = addedHomes;
