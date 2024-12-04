const { Sequelize } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: process.env.NODE_ENV === 'production' ? {
        ssl: {
            require: true, // Ensure SSL is used in production
            rejectUnauthorized: false // Allow unauthorized certificates in production
        }
    } : undefined // No dialectOptions in local or non-production environments
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
