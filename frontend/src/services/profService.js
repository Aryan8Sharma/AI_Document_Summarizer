import api from '../utils/api';

export const generateQuizQuestions = async (file, numQuestions) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('numQuestions', numQuestions);

  try {
    const response = await api.post('/professor/upload-and-generate-quiz', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Return the response (success or error message)
  } catch (error) {
    throw error.response || error; // Handle any errors
  }
};
