const axios = require("axios");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

exports.generateQuestions = async (content, numQuestions) => {
  try {
    // Define the structured prompt
    const prompt = `
      You are an intelligent assistant helping to generate quiz questions. Based on the following content, create a quiz in JSON format. Each quiz should contain a title, description, and a nested array of ${numQuestions} questions.

      Each question object should include:
      - id: A unique identifier for the question.
      - question: The text of the question.
      - options: An array of 4 possible answers (for MCQs) or 2 options (for True/False).
      - correct_answer: The correct answer from the options array.

      Example format:
      {
        "quiz": {
          "title": "Quiz Title",
          "description": "Brief description of the quiz content.",
          "questions": [
            {
              "id": 1,
              "question": "What is the main idea of the text?",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "correct_answer": "Option A"
            },
            {
              "id": 2,
              "question": "Which statement is true about X?",
              "options": ["True", "False"],
              "correct_answer": "True"
            }
          ]
        }
      }

      Generate the JSON object based on this input text:
      ---
      ${content}
      ---
      Make sure to strictly follow the JSON format with no additional explanations.
    `;

    // Send the prompt to OpenAI
    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    // Parse the response to JSON
    const jsonResponse = JSON.parse(response.choices[0].message.content);

    console.log("Generated Quiz JSON:", jsonResponse);

    return jsonResponse; // Return the structured quiz object
  } catch (error) {
    console.error("Error generating questions:", error.message);
    throw new Error("Failed to generate quiz questions. Please try again.");
  }
};
