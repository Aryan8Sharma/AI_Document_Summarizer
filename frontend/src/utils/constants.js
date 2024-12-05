export const Role = Object.freeze({
    STUDENT: "student",
    PROFESSOR: "professor"
});

export const backendBaseURL = process.env.REACT_APP_ENV ===
    "production" ?
    "https://15f3-130-65-254-16.ngrok-free.app" : "http://localhost:3000";
