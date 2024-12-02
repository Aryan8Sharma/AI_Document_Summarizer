const multer = require("multer");
const { generateQuestions } = require("../utils/openai");
const Document = require("../models/Document");
const Question = require("../models/Question");
const Quiz = require("../models/Quiz");
const fs = require("fs");
const pdfParse = require("pdf-parse");

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

exports.uploadAndGenerateQuiz = [
    upload.single("file"),
    async (req, res) => {
        try {
            const professorId = req.user.id; // Extract from token
            const { numQuestions } = req.body; // Number of questions
            const file = req.file;

            if (!file) return res.status(400).json({ message: "File is required" });

            let content = "";
            if (file.mimetype === "application/pdf") {
                const pdfData = await pdfParse(fs.readFileSync(file.path));
                content = pdfData.text;
            } else if (file.mimetype === "text/plain") {
                content = fs.readFileSync(file.path, "utf8");
            } else {
                return res.status(400).json({ message: "Invalid file type" });
            }

            // const summary = await generateSummary(content); // Call OpenAI to summarize
            const chatResponse = await generateQuestions(content, numQuestions); // Call OpenAI to generate questions

            const quiz = await Quiz.create({
                professor_id: professorId,
                title: `Quiz from ${file.originalname}`,
                description: "Auto-generated quiz",
                num_questions: numQuestions,
            });

            // Store questions in DB
            const questionData = chatResponse.quiz.questions.map((q) => ({
                quiz_id: quiz.id,
                question_text: q.question,
                options: q.options,
                correct_answer: q.correct_answer,
            }));
            await Question.bulkCreate(questionData);

            res.status(200).json({ message: "Quiz generated", quiz, questions: chatResponse.quiz.questions });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    },
];
