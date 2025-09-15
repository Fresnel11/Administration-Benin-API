// src/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://fresneljeanclaude_db_user:hcQXoZf8jpNYllFm@cluster0.pny6hn5.mongodb.net/administration-benin?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ MongoDB Atlas connecté !");
  } catch (err) {
    console.error("❌ Erreur connexion MongoDB :", err.message);
    process.exit(1);
  }
};

export default connectDB;
