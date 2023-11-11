/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const Marksheet = ({ quizQuestions, userAnswers }) => {
  // Store marksheet data
  const [marksheetData, setMarksheetData] = useState([]);
  // console.log(quizQuestions);
  // console.log(userAnswers);

  useEffect(() => {
    // Calculate the marksheet data based on userAnswers and quizQuestions
    const calculatedData = quizQuestions.map((question, index) => {
      const { id , correctOption } = question;
          
      const userAnswer = userAnswers[id];
      const isCorrect = userAnswer == correctOption;
     
      const obtainedMarks = isCorrect ? 1 : 0;

      return {
        questionNumber: index + 1,
        totalMarks: 1,
        obtainedMarks,
        isCorrect,
      };
    });

    setMarksheetData(calculatedData);
  }, [quizQuestions, userAnswers]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 mx-auto p-4">
      <h1>Mark Sheet</h1>
      <table className="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 p-2">Question Number</th>
            <th className="border border-gray-500 p-2">Total Marks</th>
            <th className="border border-gray-500 p-2">Marks Obtained</th>
            <th className="border border-gray-500 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {marksheetData.map((data, index) => (
            <tr key={index}>
              <td className="border border-gray-500 p-2">{data.questionNumber}</td>
              <td className="border border-gray-500 p-2">{data.totalMarks}</td>
              <td className="border border-gray-500 p-2">{data.obtainedMarks}</td>
              <td className={`border border-gray-500 p-2 ${data.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {data.isCorrect ? 'Correct' : 'Incorrect'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marksheet;
