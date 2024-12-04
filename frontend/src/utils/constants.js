export const Role = Object.freeze({
    STUDENT: "student",
    PROFESSOR: "professor"
});

export const backendBaseURL = process.env.REACT_APP_ENV ===
    "production" ?
    "https://zigzew5tia.execute-api.us-east-2.amazonaws.com/dev" : "http://localhost:3000";