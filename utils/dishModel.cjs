const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DishSchema = new Schema({
  dishId: {
    type: Number,
    required: true,
    unique: true,
  },
  dishName: String,
  imageUrl: String,
  isPublished: Boolean,
});
module.exports = mongoose.model("Dishes", DishSchema);
