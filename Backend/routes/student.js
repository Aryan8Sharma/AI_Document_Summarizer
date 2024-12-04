const express = require("express");
const { getQuiz, submitQuiz, getAllQuizzes } = require("../controllers/student");
const { authenticateToken } = require("../middlewares/auth");
const { Role } = require("../constants");

const router = express.Router();

router.get("/quiz", authenticateToken(Role.STUDENT), getAllQuizzes);
router.get("/quiz/:id", authenticateToken(Role.STUDENT), getQuiz);
router.post("/quiz", authenticateToken(Role.STUDENT), submitQuiz);

module.exports = router;
