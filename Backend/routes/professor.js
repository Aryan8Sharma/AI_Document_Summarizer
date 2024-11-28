const express = require("express");
const { uploadAndGenerateQuiz } = require("../controllers/professorController");
// const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/upload-and-generate-quiz", uploadAndGenerateQuiz);

module.exports = router;
