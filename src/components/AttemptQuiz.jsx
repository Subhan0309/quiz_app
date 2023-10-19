import { useState } from "react";
import Questions from "../quizzes";

function AttemptQuiz() {
    const [quizQuestions] = useState(Questions);
    const [userAnswers, setUserAnswers] = useState({});

    const handleOptionChange = (questionId, optionIndex) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: optionIndex
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let score = 0;
       // console.log(userAnswers);
    
        // Loop through each question and check if the user's answer is correct
        quizQuestions.forEach(question => {
           // console.log(question.correctOption);
            //console.log(userAnswers[question.id]);
            if (userAnswers[question.id] == question.correctOption) {
                //console.log("sUBHAN");
                score=score+1; // Increment score for every correct answer
            }
        });
    
        // Display the score
        alert(`You scored ${score} out of ${quizQuestions.length}!`);
    
        // If you want to reset or do other operations after the quiz is submitted, you can add here.
    };
    

    return (
        <div className="bg-gray-100 p-8 space-y-6 max-w-[50rem] mx-auto mt-10 rounded-lg shadow-md">
            <ul>
                {quizQuestions.map(question => (
                    <li key={question.id} className="bg-white p-6 rounded-lg shadow-sm">
                        <h1 className="text-xl text-start font-semibold mb-4">
                            {question.question}
                        </h1>
                        <div>
                        <ul className="space-y-2 pl-5 flex flex-col items-start">
                            {question.options.map((option, index) => (
                                <li key={index} className="block mb-2">
                                    <input
                                        type="radio"
                                        name={`question_${question.id}`}
                                        value={index}
                                        checked={userAnswers[question.id] === index}
                                        onChange={() => handleOptionChange(question.id, index)}
                                    />
                                    {" " + option}
                                </li>
                            ))}
                        </ul>
                        </div>
                    </li>
                ))}
            </ul>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mt-4"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
}

export default AttemptQuiz;
