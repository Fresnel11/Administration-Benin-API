import mongoose from "mongoose";

const communeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  departementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departement",
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model("Commune", communeSchema);