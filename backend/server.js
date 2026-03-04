import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDb from './config/db.js';
import resumeRoutes from './routes/resume.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);
app.get("/", (req, res) => {
  res.send("Resume Analyzer API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(
    PORT, async() => {console.log(`Server running on ${PORT}`)
    connectToDb();
}
);