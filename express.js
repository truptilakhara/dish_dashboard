const express = require("express");

const Dishes = require("./utils/dishModel.cjs");
const cors = require("cors");
const data = require("./utils/data");
const pkg = require("mongoose");
const { connect, connection } = pkg;

// DataBase
connect("mongodb://localhost:27017/dish");
const db = connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("DATABASE CONNECTED");
  dishDB();
});
const dishDB = async () => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] && data[i].dishName && data[i].dishId) {
      const existingDish = await Dishes.findOne({ dishId: data[i].dishId });
      if (!existingDish) {
        const Dish = new Dishes({
          dishName: data[i].dishName,
          dishId: data[i].dishId,
          imageUrl: data[i].imageUrl,
          isPublished: data[i].isPublished,
        });
        await Dish.save();
        console.log(`Dish ${data[i].dishName} saved successfully`);
      } else {
        console.log(`Dish with dishId ${data[i].dishId} already exists`);
      }
    }
  }
};
//
// app
const app = express();
app.use(express.json());
app.use(cors());
app.get("/dishes", async (req, res) => {
  try {
    const dishes = await Dishes.find();
    res.json(dishes);
    console.log(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put("/dishes/:dishId", async (req, res) => {
  const { dishId } = req.params;
  const { isPublished } = req.body;
  try {
    const updatedDish = await Dishes.findOneAndUpdate(
      { dishId },
      { $set: { isPublished } },
      { new: true }
    );
    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen("1234", () => {
  console.log("Server is running on port number 3000");
});
//
