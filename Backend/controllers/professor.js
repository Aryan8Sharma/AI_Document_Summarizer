const multer = require("multer");
const { generateQuestions } = require("../utils/openai");
const Document = require("../models/Document");
const Question = require("../models/Question");
const Quiz = require("../models/Quiz");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const path = require("path");

// Set up multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory as buffers
    limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Limit file size to 5 MB
});

exports.uploadAndGenerateQuiz = [
    upload.single("file"), // Single file upload
    async (req, res) => {
        try {
            const professorId = req.user.id; // Extract from token
            const { numQuestions } = req.body; // Number of questions
            const file = req.file;
            if (!file) return res.status(400).json({ message: "File is required" });

            let content = "";
            if (file.mimetype === "application/pdf") {
                const tempFilePath = path.join("/tmp", file.originalname);
                fs.writeFileSync(tempFilePath, file.buffer);
                const pdfData = await pdfParse(fs.readFileSync(tempFilePath));
                content = pdfData.text;
                fs.unlinkSync(tempFilePath);
            } else if (file.mimetype === "text/plain") {
                content = file.buffer.toString("utf8");
            } else {
                return res.status(400).json({ message: "Only PDF and text files are allowed" });
            }

            // const summary = await generateSummary(content); // Call OpenAI to summarize
            const chatResponse = await generateQuestions(content, numQuestions);

            const quiz = await Quiz.create({
                professor_id: professorId,
                title: chatResponse.quiz.title,
                description: "Auto-generated quiz",
                num_questions: numQuestions,
            });

            const questionData = chatResponse.quiz.questions.map((q) => ({
                quiz_id: quiz.id,
                question_text: q.question,
                options: q.options,
                correct_answer: q.correct_answer,
            }));
            await Question.bulkCreate(questionData);

            res.status(200).json({
                message: "Quiz generated",
                quiz,
                questions: chatResponse.quiz.questions,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    },
];
