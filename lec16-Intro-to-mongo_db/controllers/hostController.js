const { Favourite } = require("../Models/favourite");
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
  Home.fetchAll().then((homes) => {
    res.render("host/host-home-list", {
      addedHomes: homes,
      title: "BNB HOME",
      currentPage: "host-home-list",
    });
  });
};

// exports.postDeleteHome = async (req, res, next) => {
//   const homeId = req.params.homeId;

//   try {
//     await Home.deleteHomeById(homeId);
//   } catch (error) {
//     console.log("Error while deleting home:", error);
//     return res.redirect("/host/host-home-list");
//   }

//   try {
//     await Favourite.removeFromFavoritesById(homeId);
//   } catch (error) {
//     console.log("Error while removing home from favourites:", error);
//     return res.redirect("/host/host-home-list");
//   }

//   res.redirect("/host/host-home-list");
// };

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteHomeById(homeId)
    .then(() => {
      Favourite.removeFromFavoritesById(homeId, (err) => {
        if (err) {
          console.log("Error While removing from favourites", err);
        }
        res.redirect("/host/host-home-list");
      });
    })
    .catch((error) => {
      console.log("Error while deleting: ", error);
      res.redirect("/host/host-home-list");
    });
};

exports.postAddHome = (req, res, next) => {
  const { name, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(name, price, location, rating, photoUrl, description);
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
  const { id, name, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(
    name,
    price,
    location,
    rating,
    photoUrl,
    description,
    id,
  );
  // home._id = this.id;
  home._id = id;
  home.save();

  res.redirect("/host/host-home-list");
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  console.log(homeId, editing);

  Home.findHomeById(homeId).then((home) => {
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
