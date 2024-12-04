require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const serverless = require("aws-serverless-express");

// Import routes
const authRoutes = require("./routes/auth");
const professorRoutes = require("./routes/professor");
const studentRoutes = require("./routes/student");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/professor", professorRoutes);
app.use("/student", studentRoutes);

// Database connection
sequelize.sync({ alter: true }).then(() => {
    console.log("Database connected and synchronized");
});

const server = serverless.createServer(app);

exports.app = app;
exports.handler = (event, context) => {
    serverless.proxy(server, event, context);
};