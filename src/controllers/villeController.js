import * as villeService from "../services/villeService.js";

export const getAllVilles = async (req, res) => {
  try {
    const villes = await villeService.getAllVilles();
    res.json(villes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVilleById = async (req, res) => {
  try {
    const ville = await villeService.getVilleById(req.params.id);
    if (!ville) {
      return res.status(404).json({ message: "Ville non trouvée" });
    }
    res.json(ville);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVille = async (req, res) => {
  try {
    const ville = await villeService.createVille(req.body);
    res.status(201).json(ville);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVille = async (req, res) => {
  try {
    const ville = await villeService.updateVille(req.params.id, req.body);
    if (!ville) {
      return res.status(404).json({ message: "Ville non trouvée" });
    }
    res.json(ville);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVille = async (req, res) => {
  try {
    const ville = await villeService.deleteVille(req.params.id);
    if (!ville) {
      return res.status(404).json({ message: "Ville non trouvée" });
    }
    res.json({ message: "Ville supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVillesByCommune = async (req, res) => {
  try {
    const villes = await villeService.getVillesByCommune(req.params.communeId);
    res.json(villes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};