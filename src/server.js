import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from "./config/db.js";
import setupSwagger from "./config/swagger.js";
import departementRoutes from "./routes/departementRoutes.js";
import communeRoutes from "./routes/communeRoutes.js";
import villeRoutes from "./routes/villeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// Database connection
connectDB();

// Swagger documentation
setupSwagger(app);

// Routes
app.use("/api/departements", departementRoutes);
app.use("/api/communes", communeRoutes);
app.use("/api/villes", villeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});