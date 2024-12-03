import React, { useState } from 'react';
import axios from '../../utils/api';

const UploadNotes = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    await axios.post('/generateExamQuiz', formData);
    alert('Quiz Generated!');
  };

  return (
    <div>
      <h1>Upload Notes</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadNotes;
