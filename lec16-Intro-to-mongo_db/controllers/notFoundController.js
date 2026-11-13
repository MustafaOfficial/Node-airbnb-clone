exports.notFound = (req, res, next) => {
  res.status(404);
  // res.sendFile(path.join(__dirname, "../", "views", "error404.html"));
  res.render("error404", { title: "Error 404", currentPage: "error404" });
};
