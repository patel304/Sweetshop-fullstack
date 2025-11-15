import dotenv from "dotenv";
import mongoose from "mongoose";
import { Sweet } from "./src/models/Sweet";

dotenv.config();

const categories = [
  "Traditional",
  "Bengali",
  "South Indian",
  "Dessert",
  "Special",
  "Dry Sweet"
];

const sweetNames = [
  "Laddu", "Jalebi", "Gulab Jamun", "Rasgulla", "Barfi", "Peda",
  "Kaju Katli", "Soan Papdi", "Cham Cham", "Malai Sandwich",
  "Kheer Kadam", "Sandesh", "Imarti", "Balushahi", "Chikki",
  "Motichoor Laddu", "Boondi", "Halwa", "Milk Cake", "Badam Burfi",
  "Besan Laddu", "Mysore Pak", "Dry Fruit Laddu", "Khoya Barfi",
  "Dry Coconut Barfi", "Til Laddu", "Kesar Peda", "Chocolate Barfi",
  "Rabri", "Gajar Halwa", "Doodh Peda", "Anjeer Barfi", "Pista Roll",
  "Chum Chum", "Rasmalai", "Kaju Roll", "Son Rolls", "Dry Imarti",
  "Sugar-free Barfi"
];

// 🟢 Add your custom image path here later
// imagePaths array LENGTH = sweetNames.length
// Empty string means default image will be used.
const imagePaths = new Array(sweetNames.length).fill("");

const generateSweet = (i: number) => {
  const name =
    sweetNames[i % sweetNames.length] +
    " " +
    (Math.floor(i / sweetNames.length) + 1);

  const imagePath = imagePaths[i % sweetNames.length];

  return {
    name,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 200) + 20,
    quantity: Math.floor(Math.random() * 100) + 10,

    // 🟢 If you add your path → use it
    // 🟡 If empty → default placeholder
    image: imagePath || `https://placehold.co/300x300?text=${name}`
  };
};

const seed = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected!");

    await Sweet.deleteMany({});
    console.log("Old data removed");

    const sweetData = [];
    for (let i = 0; i < 100; i++) {
      sweetData.push(generateSweet(i));
    }

    await Sweet.insertMany(sweetData);

    console.log("100 sweets added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seed();
