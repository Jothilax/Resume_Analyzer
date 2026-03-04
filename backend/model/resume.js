import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  resumeFilePath: {
    type: String,
    required: true
  },
  extractedText: {
    type: String
  },
  selectedJobRole: {
    type: String,
    enum: ["Full Stack", "Frontend", "Backend"]
  },
  resumeScore: Number,
  skillMatchPercentage: Number,
  missingSkills: [String],
  suggestions: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;