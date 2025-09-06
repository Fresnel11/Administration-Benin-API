import express from "express";
import * as communeController from "../controllers/communeController.js";

const router = express.Router();

router.get("/", communeController.getAllCommunes);
router.get("/:id", communeController.getCommuneById);
router.post("/", communeController.createCommune);
router.put("/:id", communeController.updateCommune);
router.delete("/:id", communeController.deleteCommune);
router.get("/departement/:departementId", communeController.getCommunesByDepartement);

export default router;