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
const imagePaths = ["Images/laddu.jpeg","Images/jalebi.jpeg","Images/gulab-jamun.jpeg",
  "Images/rasgulla.jpeg","Images/barfi.jpeg","Images/peda.jpeg","Images/kaju-katli.jpeg",
  "Images/soan-papdi.jpeg","Images/cham-cham.jpeg","Images/malai-sandwich.jpeg","Images/Kheer-kadam.jpeg",
"Images/sandesh.jpeg","Images/imarti.jpeg","Images/bulashahi.jpeg","Images/chikki.jpeg",
"Images/motichor.jpeg","Images/boondi.jpeg","Images/halwa.jpeg","Images/milk-cake.jpeg",
"Images/badam burfi.jpeg","Images/Besan-laddu.jpeg","Images/mysore-pak.jpeg","Images/dry-fruit-laddu.jpeg",
"Images/khoya-burfi.jpeg","Images/coconut-burfi.jpeg","Images/til-laddu.jpeg","Images/kesar-peda.jpeg",
"Images/chocalate-burfi.jpeg","Images/Rabri.jpeg","Images/gajar halwa.jpeg","Images/dhoodh-peda.jpeg",
"Images/anjir-burfi.jpeg","Images/pista-roll.jpeg","Images/cham-cham.jpeg","Images/ras-malai.jpeg",
"Images/kaju-roll.jpeg","Images/son-roll.jpeg","Images/imarti.jpeg","Images/sugar-free.jpeg"
];

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
