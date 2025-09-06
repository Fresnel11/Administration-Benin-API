import Ville from "../models/ville.js";

export const getAllVilles = async () => {
  return await Ville.find().populate({
    path: "communeId",
    select: "nom",
    populate: { path: "departementId", select: "nom" }
  });
};

export const getVilleById = async (id) => {
  return await Ville.findById(id).populate({
    path: "communeId",
    select: "nom",
    populate: { path: "departementId", select: "nom" }
  });
};

export const createVille = async (data) => {
  return await Ville.create(data);
};

export const updateVille = async (id, data) => {
  return await Ville.findByIdAndUpdate(id, data, { new: true }).populate({
    path: "communeId",
    select: "nom",
    populate: { path: "departementId", select: "nom" }
  });
};

export const deleteVille = async (id) => {
  return await Ville.findByIdAndDelete(id);
};

export const getVillesByCommune = async (communeId) => {
  return await Ville.find({ communeId }).populate({
    path: "communeId",
    select: "nom",
    populate: { path: "departementId", select: "nom" }
  });
};