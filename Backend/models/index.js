const {sequelize} = require("../config/db");
const User = require("./User");
const Quiz = require("./Quiz");
const Question = require("./Question");
const Document = require("./Document");

// Define associations
Quiz.hasMany(Question, { foreignKey: "quiz_id", as: "questions" });
Question.belongsTo(Quiz, { foreignKey: "quiz_id" });

Document.belongsTo(User, { foreignKey: "professor_id" });
User.hasMany(Document, { foreignKey: "professor_id" });

User.hasMany(Quiz, { foreignKey: "professor_id" });
Quiz.belongsTo(User, { foreignKey: "professor_id" });

// Export models and Sequelize instance
module.exports = {
    sequelize,
    User,
    Quiz,
    Question,
    Document,
};