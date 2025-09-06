import mongoose from "mongoose";

const villeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  communeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commune",
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model("Ville", villeSchema);