const path = require("path"); // <--- Add this import
const express = require("express");
const contactRouter = require("./routes/contactRouter");
const rootDir = require("./utils/rootDir");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(contactRouter);

// Handling undefined paths by sending 404 response
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "error404.html"));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
