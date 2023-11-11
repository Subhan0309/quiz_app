import { useState } from "react";
import Questions from "../quizzes";
import Notification from "./Notification";
import Marksheet from "./MarkSheet";

function AttemptQuiz() {
    const [quizQuestions] = useState(Questions);
    const [userAnswers, setUserAnswers] = useState({});
    const [notification, setNotification] = useState(null);
    const [showScore, setShowScore] = useState(false);

    // When the user selects an option
    const handleOptionChange = (questionId, selectedOption) => {
        setUserAnswers({ ...userAnswers, [questionId]: selectedOption });
    };

    const handleSubmit = () => {
        let score = 0;

        setShowScore(true);

        quizQuestions.forEach((question) => {
            if (userAnswers[question.id] == question.correctOption) {
                score = score + 1;
            }
        });

        // Determine the notification message and type
        let notificationMessage = "";
        let notificationType = "";
        if (score === 0) {
            notificationMessage = "You scored 0 out of " + quizQuestions.length + "!";
            notificationType = "danger";
        } else if (score === quizQuestions.length) {
            notificationMessage = "You scored full marks! Congratulations!";
            notificationType = "success";
        } else {
            notificationMessage = "You scored " + score + " out of " + quizQuestions.length + ".";
            notificationType = "warning";
        }

        // Show the notification
        setNotification({ message: notificationMessage, type: notificationType });

        // Clear the selected answers by resetting userAnswers to an empty object
       // setUserAnswers({});

        // Set a timeout to hide the notification after 3 seconds
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <>
            {showScore ? (
                <>
                    
                    <Marksheet quizQuestions={quizQuestions} userAnswers={userAnswers} />
                </>
            ) : (
                <div>
                    <h1 className="w-full text-center font-extrabold text-black py-10 text-3xl ">Quiz Title</h1>
                    <div className="bg-purple-200 text-white p-8 space-y-6 max-w-[65rem] mx-auto mb-5  rounded-lg shadow-md">
                        <ul>
                            {quizQuestions.map((question, questionIndex) => (
                                <li
                                    key={question.id}
                                    className={`bg-purple-500 p-6 rounded-lg shadow-lg transition-colors my-10  cursor-pointer ${userAnswers[question.id] !== undefined
                                        ? "bg-purple-700"
                                        : "hover:outline hover:shadow-md "
                                        }`}
                                >
                                    <h1 className="text-xl text-start font-semibold mb-4 text-white">
                                        {`${questionIndex + 1}. ${question.question}`}
                                    </h1>
                                    {/* //options */}
                                    <div>
                                        <ul className="space-y-2 pl-5 flex flex-col items-start">
                                            {question.options.map((option, optionIndex) => (
                                                <label
                                                    key={optionIndex}
                                                    className="mb-2 flex items-center space-x-2 cursor-pointer text-white"
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`question_${question.id}`}
                                                        value={optionIndex}
                                                        checked={userAnswers[question.id] === optionIndex}
                                                        onChange={() => handleOptionChange(question.id, optionIndex)}
                                                        className="hidden"
                                                    />
                                                    <div className="w-4 h-4 border-[3px] border-white rounded-full flex items-center justify-center">
                                                        {userAnswers[question.id] === optionIndex && (
                                                            <div className="w-4 h-4 bg-white rounded-full" />
                                                        )}
                                                    </div>
                                                    <span>{option}</span>
                                                </label>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="w-full flex justify-center">
                            <button
                                className="bg-orange-500 text-white w-1/5   px-4 py-2 rounded hover:bg-orange-600 transition-colors mt-4"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    {notification && (
                        <Notification message={notification.message} type={notification.type} />
                    )}
                </div>
            )}
        </>
    );
}
export default AttemptQuiz;

