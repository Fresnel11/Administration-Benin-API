import express from "express";
import * as departementController from "../controllers/departementController.js";

const router = express.Router();

router.get("/", departementController.getAllDepartements);
router.get("/:id", departementController.getDepartementById);
router.post("/", departementController.createDepartement);
router.put("/:id", departementController.updateDepartement);
router.delete("/:id", departementController.deleteDepartement);

export default router;