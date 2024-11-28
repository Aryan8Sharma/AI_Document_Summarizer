require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./config/db");

// Import routes
// const authRoutes = require("./routes/auth");
const professorRoutes = require("./routes/professor");
// const studentRoutes = require("./routes/student");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
// app.use("/auth", authRoutes);
app.use("/professor", professorRoutes);
// app.use("/student", studentRoutes);

// Database connection
sequelize.sync({ alter: true }).then(() => {
    console.log("Database connected and synchronized");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
