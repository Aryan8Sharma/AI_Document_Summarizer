const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Document = sequelize.define("Document", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    professor_id: { type: DataTypes.UUID, allowNull: false },
    file_url: { type: DataTypes.STRING, allowNull: false },
    summary_json: { type: DataTypes.JSON },
});

module.exports = Document;
