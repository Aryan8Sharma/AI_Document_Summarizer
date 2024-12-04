import React, { useEffect, useState } from 'react';
import axios from '../../utils/api';

const StudentHome = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const response = await axios.get('/getAssignedExams');
      setExams(response.data);
    };
    fetchExams();
  }, []);

  return (
    <div>
      <h1>Assigned Exams</h1>
      {exams.map((exam) => (
        <div key={exam.quiz_id}>
          <h3>{exam.title}</h3>
          <button onClick={() => (window.location = `/student/exam/${exam.quiz_id}`)}>
            Start Exam
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudentHome;
