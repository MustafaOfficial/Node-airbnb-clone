const { default: mongoose } = require("mongoose");

const homeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  rating: Number,
  photoUrl: String,
  description: String,
});

homeSchema.pre("findOneAndDelete", async function () {
  const homeId = this.getFilter()._id;
  await mongoose.model("Favourite").deleteMany({ homeId });
});

// - **`this`** is the query, not a document, because this is query middleware. `this.getFilter()` returns the filter the query was run with, which for `findByIdAndDelete(homeId)` is `{ _id: homeId }`.
// - **`mongoose.model("Favourite")`** looks the model up by name at runtime, so you don't need to `require` it. That avoids a circular import. It works as long as `Models/favourite.js` has been loaded somewhere, which your controllers already do.
// - **`deleteMany`** is a bit safer than `findOneAndDelete` here, since it clears any matching favourites.

module.exports = mongoose.model("Home", homeSchema);
