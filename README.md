
# QuizGen: A Serverless Application for Automated Quiz Generation

**QuizGen** is a cloud-native, serverless application that dynamically generates quizzes from uploaded files. The project integrates a React-based frontend and a serverless backend hosted on AWS to provide educators and users with a scalable and efficient platform.

![image](https://github.com/user-attachments/assets/aa901bc2-ada2-434e-92af-a276b77343d2)


---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [System Architecture](#system-architecture)
4. [Technologies Used](#technologies-used)
5. [Installation and Deployment](#installation-and-deployment)
   - [Backend](#backend)
   - [Frontend](#frontend)
6. [Usage](#usage)
7. [Folder Structure](#folder-structure)

Project Report : [View the PDF](./AI_Document_Summarizer-Report.pdf)

---

## Overview

QuizGen is designed to simplify the process of quiz generation using uploaded documents. The application leverages AI (via OpenAI APIs) to extract content from PDFs and text files, automatically generating questions and quizzes. It features a React frontend hosted on an S3 bucket, with a backend powered by AWS Lambda and API Gateway.

---

## Features

- **File Upload and Parsing**: Users can upload PDF or text files, which are parsed for content.
- **AI-Powered Quiz Generation**: Integrates OpenAI APIs to generate questions based on the uploaded content.
- **User Authentication**: JWT-based secure authentication for professors and students.
- **Quiz Storage**: Quizzes and questions are stored in an RDS PostgreSQL database for later retrieval.
- **Scalable Architecture**: Serverless backend and frontend ensure high scalability.
- **CI/CD Pipeline**: Automated deployment via GitHub Actions.

---

## System Architecture

### Backend:
- Built using **Node.js** and **Serverless Framework**.
- Uses AWS services such as **Lambda**, **API Gateway**, and **RDS (PostgreSQL)**.
- Handles file uploads, AI integration, and database operations.

### Frontend:
- Developed using **React**.
- Hosted on an **S3 bucket** with public access.
- Manages user interactions, including file uploads and quiz retrieval.

---

## Technologies Used

### Backend:
- **Node.js**: Runtime environment for the serverless backend.
- **Serverless Framework**: Infrastructure-as-code for AWS deployment.
- **Sequelize ORM**: For database operations with PostgreSQL.
- **AWS Services**: Lambda, API Gateway, RDS, S3, and SSM Parameter Store.
- **OpenAI API**: For generating quizzes dynamically.

### Frontend:
- **React**: Single-page application (SPA).
- **React Router**: For routing and navigation.
- **AWS S3**: Static file hosting for the frontend.

### CI/CD:
- **GitHub Actions**: Automates deployment for both frontend and backend.

---

## Installation and Deployment

### Backend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/quizgen.git
   cd quizgen/Backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Set up the following in your AWS SSM Parameter Store:
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
   - `FRONTEND_BASE_URL`

4. **Deploy the backend**:
   ```bash
   npx serverless deploy --stage production
   ```

### Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd quizgen/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the React app**:
   ```bash
   npm run build
   ```

4. **Deploy to S3**:
   ```bash
   aws s3 sync ./build s3://your-s3-bucket-name --delete
   ```

---

## Usage

### For Professors:
1. **Sign Up** or **Log In** to upload a file (PDF or text).
2. Choose the number of questions for the quiz.
3. Review and save the generated quiz.

### For Students:
1. View assigned quizzes.
2. Answer the questions and submit the quiz.
3. Receive auto-graded results.

---

## Folder Structure

```
quizgen/
├── Backend/             # Serverless backend code
│   ├── models/          # Database models
│   ├── controllers/     # API controllers
│   ├── server.js        # Express server setup
│   └── serverless.yml   # Serverless deployment configuration
├── frontend/            # React frontend code
│   ├── src/             # React app source files
│   ├── public/          # Static files
│   └── package.json     # Frontend dependencies
└── .github/workflows/   # GitHub Actions CI/CD workflows
```
