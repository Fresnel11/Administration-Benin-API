import Departement from "../models/departement.js";

export const getAllDepartements = async () => {
  return await Departement.find();
};

export const getDepartementById = async (id) => {
  return await Departement.findById(id);
};

export const createDepartement = async (data) => {
  return await Departement.create(data);
};

export const updateDepartement = async (id, data) => {
  return await Departement.findByIdAndUpdate(id, data, { new: true });
};

export const deleteDepartement = async (id) => {
  return await Departement.findByIdAndDelete(id);
};