const multer = require("multer");
const { generateQuestions } = require("../utils/openai");
const { Document } = require("../models/Document");
const { Quiz } = require("../models/Quiz");
const fs = require("fs");
const pdfParse = require("pdf-parse");

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

exports.uploadAndGenerateQuiz = [
    upload.single("file"),
    async (req, res) => {
        try {
            // const professorId = req.user.id; // Extract from token
            const file = req.file;

            if (!file) return res.status(400).json({ message: "File is required" });

            console.log(file);
            

            let content = "";
            if (file.mimetype === "application/pdf") {
                const pdfData = await pdfParse(fs.readFileSync(file.path));
                content = pdfData.text;
            } else if (file.mimetype === "text/plain") {
                content = fs.readFileSync(file.path, "utf8");
            } else {
                return res.status(400).json({ message: "Invalid file type" });
            }

            const questions = await generateQuestions(content);

            // console.log(questions);
            

            // const quiz = await Quiz.create({
            //     professor_id: "112",
            //     title: `Quiz from ${file.originalname}`,
            // });

            res.status(200).json({ message: "Quiz generated", questions });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    },
];
