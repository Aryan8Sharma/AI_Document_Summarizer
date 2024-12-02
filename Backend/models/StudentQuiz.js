const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const StudentQuiz = sequelize.define("StudentQuiz", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    student_id: { type: DataTypes.UUID, allowNull: false },
    quiz_id: { type: DataTypes.UUID, allowNull: false },
    answers: { type: DataTypes.JSON }, // Student's answers
    score: { type: DataTypes.INTEGER }, // Auto-graded score
});

module.exports = StudentQuiz;
