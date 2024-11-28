const { Sequelize } = require("sequelize");

// Initialize Sequelize
console.log("-----------" + process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
};

connectDB();

module.exports = { sequelize };
