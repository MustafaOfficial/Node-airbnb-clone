const Favourite = require("../Models/favourite");
const Home = require("../Models/home");
const { addedHomes } = require("../Models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    title: "Add Home",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.cookies.isLoggedIn,
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("host/host-home-list", {
      addedHomes: homes,
      title: "BNB HOME",
      currentPage: "host-home-list",
      isLoggedIn: req.cookies.isLoggedIn,
    });
  });
};

exports.postDeleteHome = async (req, res) => {
  const homeId = req.params.homeId;

  try {
    const deletedHome = await Home.findByIdAndDelete(homeId);
    console.log(`Home deleted with id ${homeId}`);
  } catch (err) {
    console.log(`Error while deleting home ${homeId}:`, err);
  }
  res.redirect("/host/host-home-list");
};

exports.postAddHome = (req, res, next) => {
  const { name, price, location, rating, photoUrl, description } = req.body;
  const home = new Home({
    name,
    price,
    location,
    rating,
    photoUrl,
    description,
  });
  home.save();

  res.render("host/homeAdded", {
    addedHome: req.body,
    title: "Home Added",
    currentPage: "homeAdded",
    isLoggedIn: req.cookies.isLoggedIn,
  });
  console.log(req.body);
  console.log(addedHomes);
};

exports.postEditHome = (req, res, next) => {
  const { id, name, price, location, rating, photoUrl, description } = req.body;
  Home.findById(id)
    .then((home) => {
      home.name = name;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photoUrl = photoUrl;
      home.description = description;
      return home.save();
    })
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while updating Home", err);
    });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  console.log(homeId, editing);

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("host/host-home=list");
    }

    res.render("host/edit-home", {
      editing: editing,
      home: home,
      title: "Edit Home",
      currentPage: "edit-home",
      isLoggedIn: req.cookies.isLoggedIn,
    });
    console.log(req.body);
    console.log(addedHomes);
  });
};

// exports.postDeleteHome = async (req, res, next) => {
//   const homeId = req.params.homeId;

//   try {
//     await Home.findByIdAndDelete(homeId);
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

// exports.postDeleteHome = (req, res, next) => {
//   const homeId = req.params.homeId;
//   Home.findByIdAndDelete(homeId)
//     .then(() => {
//       Favourite.findOneAndDelete({ homeId }).then((err) => {
//         if (err) {
//           console.log("Error While removing from favourites", err);
//         }
//         res.redirect("/host/host-home-list");
//       });
//     })
//     .catch((error) => {
//       console.log("Error while deleting: ", error);
//       res.redirect("/host/host-home-list");
//     });
// };

// exports.addedHomes = addedHomes;
