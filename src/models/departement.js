import mongoose from "mongoose";

const departementSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

export default mongoose.model("Departement", departementSchema);