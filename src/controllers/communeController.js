import * as communeService from "../services/communeService.js";

export const getAllCommunes = async (req, res) => {
  try {
    const communes = await communeService.getAllCommunes();
    res.json(communes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommuneById = async (req, res) => {
  try {
    const commune = await communeService.getCommuneById(req.params.id);
    if (!commune) {
      return res.status(404).json({ message: "Commune non trouvée" });
    }
    res.json(commune);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCommune = async (req, res) => {
  try {
    const commune = await communeService.createCommune(req.body);
    res.status(201).json(commune);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCommune = async (req, res) => {
  try {
    const commune = await communeService.updateCommune(req.params.id, req.body);
    if (!commune) {
      return res.status(404).json({ message: "Commune non trouvée" });
    }
    res.json(commune);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCommune = async (req, res) => {
  try {
    const commune = await communeService.deleteCommune(req.params.id);
    if (!commune) {
      return res.status(404).json({ message: "Commune non trouvée" });
    }
    res.json({ message: "Commune supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommunesByDepartement = async (req, res) => {
  try {
    const communes = await communeService.getCommunesByDepartement(req.params.departementId);
    res.json(communes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};