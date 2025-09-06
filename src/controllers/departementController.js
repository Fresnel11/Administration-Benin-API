import * as departementService from "../services/departementService.js";

export const getAllDepartements = async (req, res) => {
  try {
    const departements = await departementService.getAllDepartements();
    res.json(departements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartementById = async (req, res) => {
  try {
    const departement = await departementService.getDepartementById(req.params.id);
    if (!departement) {
      return res.status(404).json({ message: "Département non trouvé" });
    }
    res.json(departement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDepartement = async (req, res) => {
  try {
    const departement = await departementService.createDepartement(req.body);
    res.status(201).json(departement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDepartement = async (req, res) => {
  try {
    const departement = await departementService.updateDepartement(req.params.id, req.body);
    if (!departement) {
      return res.status(404).json({ message: "Département non trouvé" });
    }
    res.json(departement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDepartement = async (req, res) => {
  try {
    const departement = await departementService.deleteDepartement(req.params.id);
    if (!departement) {
      return res.status(404).json({ message: "Département non trouvé" });
    }
    res.json({ message: "Département supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};