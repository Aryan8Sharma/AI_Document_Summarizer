const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Quiz = sequelize.define("Quiz", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    summary: { type: DataTypes.TEXT },
    num_questions: { type: DataTypes.INTEGER, allowNull: false },
    professor_id: { type: DataTypes.UUID, allowNull: false },
    start_time: { type: DataTypes.DATE },
    end_time: { type: DataTypes.DATE },
});

module.exports = Quiz;
