import Resume from "../model/resume.js";
import { extractTextFromPDF } from "../utils/pdfExtractor.js";
import { matchSkills } from "../utils/skillMatcher.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { userId, selectedJobRole } = req.body;

    if (!userId || !selectedJobRole) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ 1. Extract Text
    const extractedText = await extractTextFromPDF(req.file.filename);

    // ✅ 2. Match Skills
    const { matchedSkills, missingSkills, skillMatchPercentage } =
      matchSkills(extractedText, selectedJobRole);

    // ✅ 3. Intelligent Score Logic
    let finalScore = skillMatchPercentage;

    const textLower = extractedText.toLowerCase();

    if (textLower.includes("project")) finalScore += 5;
    if (textLower.includes("experience")) finalScore += 5;
    if (textLower.includes("intern")) finalScore += 5;

    if (finalScore > 100) finalScore = 100;

    // ✅ 4. Save to DB
    const resume = await Resume.create({
      userId,
      resumeFilePath: req.file.filename,
      extractedText,
      selectedJobRole,
      matchedSkills,
      missingSkills,
      skillMatchPercentage,
      finalScore
    });

    // ✅ 5. Professional Response
    res.status(201).json({
      message: "Resume analyzed successfully",
      score: finalScore,
      skillMatchPercentage,
      matchedSkills,
      missingSkills,
      suggestions:
        missingSkills.length > 0
          ? `Improve your resume by adding: ${missingSkills.join(", ")}`
          : "Excellent! Your resume matches the job role requirements."
    });

  } catch (error) {
    console.log("Upload Resume Error:", error);
    res.status(500).json({ message: error.message });
  }
};