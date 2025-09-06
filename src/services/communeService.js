import Commune from "../models/commune.js";

export const getAllCommunes = async () => {
  return await Commune.find().populate("departementId", "nom");
};

export const getCommuneById = async (id) => {
  return await Commune.findById(id).populate("departementId", "nom");
};

export const createCommune = async (data) => {
  return await Commune.create(data);
};

export const updateCommune = async (id, data) => {
  return await Commune.findByIdAndUpdate(id, data, { new: true }).populate("departementId", "nom");
};

export const deleteCommune = async (id) => {
  return await Commune.findByIdAndDelete(id);
};

export const getCommunesByDepartement = async (departementId) => {
  return await Commune.find({ departementId }).populate("departementId", "nom");
};