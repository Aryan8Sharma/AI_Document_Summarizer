const express = require("express");
const { uploadAndGenerateQuiz } = require("../controllers/professorController");
const { authenticateToken } = require("../middlewares/auth");
const { Role } = require("../constants");

const router = express.Router();

router.post("/upload-and-generate-quiz", authenticateToken(Role.PROFESSOR), uploadAndGenerateQuiz);

module.exports = router;
