import express from "express";
import * as villeController from "../controllers/villeController.js";

const router = express.Router();

router.get("/", villeController.getAllVilles);
router.get("/:id", villeController.getVilleById);
router.post("/", villeController.createVille);
router.put("/:id", villeController.updateVille);
router.delete("/:id", villeController.deleteVille);
router.get("/commune/:communeId", villeController.getVillesByCommune);

export default router;