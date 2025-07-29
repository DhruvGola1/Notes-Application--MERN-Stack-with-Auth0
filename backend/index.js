import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
import connectDB from "./dataBase/db.js";

dotenv.config();
const DATA_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

connectDB(DATA_URI);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
