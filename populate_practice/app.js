const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const User = require("./models/User");
const Post = require("./models/Post");

const app = express();
const PORT = 3000;
const MONGO_URI =
  "mongodb+srv://root:root@homescluster.xwndjiz.mongodb.net/populate_practice";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// STEP 1: save data
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const post = await Post.findOne({
      author: "6afb2317a8b3a526e23e9132",
    }).populate("author", "name email -_id");

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.send(`<ul>
      <li>${post.title}</li>
      <li>${post.body}</li>
      <li>${post.author.name}</li>
      <li>${post.author.email}</li>
    </ul>`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.get("/posts", async (req, res) => {
//   try {
//     const posts = await Post.find({
//       _id: new ObjectId(String("6afb2317a8b3a526e23e9132")),
//     }).populate("author", "name email -_id");
//     // res.json(posts);
//     res.send(`<p>${posts}</p>`);

//     // res.send(`<ul>$<li>${posts[0].}</li><li>${}</li><li>${}</li><li>${}</li><li>${}</li></ul>`);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
