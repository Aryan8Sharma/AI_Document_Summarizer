const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    quiz_id: { type: DataTypes.UUID, allowNull: false },
    question_text: { type: DataTypes.TEXT, allowNull: false },
    options: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    correct_answer: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Question;
