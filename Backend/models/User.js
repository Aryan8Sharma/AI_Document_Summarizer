const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { Role } = require("../constants");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM(Role.STUDENT, Role.PROFESSOR), allowNull: false },
});

module.exports = User;