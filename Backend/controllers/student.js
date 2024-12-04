const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const StudentQuiz = require("../models/StudentQuiz");

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.findAll({
            attributes: ["id", "title", "description", "start_time", "end_time"],
        });

        res.status(200).json({ quizzes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch quizzes" });
    }
};


exports.getQuiz = async (req, res) => {
    try {
        const quizId = req.params.id;

        const quiz = await Quiz.findOne({
            where: { id: quizId },
            attributes: ["id", "title", "description", "start_time", "end_time"],
            include: {
                model: Question,
                as: "questions",
                attributes: ["id", "question_text", "options"],
            },
        });

        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        res.status(200).json({ quiz });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch quiz details" });
    }
};


exports.submitQuiz = async (req, res) => {
    try {
        const studentId = req.user.id; // Extract from token
        const { quizId, answers } = req.body;

        const quiz = await Quiz.findByPk(quizId);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        const questions = await Question.findAll({ where: { quiz_id: quizId } });

        // Auto-grading
        let score = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.correct_answer) score++;
        });

        await StudentQuiz.create({
            student_id: studentId,
            quiz_id: quizId,
            answers,
            score,
        });

        res.status(200).json({ message: "Quiz submitted", score });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

