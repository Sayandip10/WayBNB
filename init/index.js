require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const mongoUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await User.deleteMany({});

  const ownerUser = new User({
    email: "owner@example.com",
    username: "demo-user",
  });
  let registeredOwner = await User.register(ownerUser, "demopassword");
  console.log("Created demo user");

  // Create clean data that matches the schema
  const updatedData = initData.data.map((obj) => ({
    // We are no longer using ...obj to avoid carrying over the bad format
    title: obj.title,
    description: obj.description,
    image: obj.image,
    price: obj.price,
    location: obj.location,
    country: obj.country,
    category: obj.category,
    geometry: obj.geometry,
    // Set the new, valid owner
    owner: registeredOwner._id,
    // Initialize reviews as an empty array
    reviews: [],
  }));

  await Listing.insertMany(updatedData);
  console.log("DB was initialized successfully!");
};

initDB();