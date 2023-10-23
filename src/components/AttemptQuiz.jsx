import { useState } from "react";
import Questions from "../quizzes";
import Notification from "./Notification";

function AttemptQuiz() {
    const [quizQuestions] = useState(Questions);
    const [userAnswers, setUserAnswers] = useState({});
    const [notification, setNotification] = useState(null);
    const [done,setDone]=useState(false);
    const [answersNotifications,setAnswerNotifications]=useState({});

    const handleOptionChange = (questionId, optionIndex) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: optionIndex,
        }));
     // Check if the selected answer is correct
     const isCorrect = quizQuestions[questionId].correctOption === optionIndex;

     // Update the answersNotifications based on correctness
     setAnswerNotifications((prevNotifications) => ({
       ...prevNotifications,
       [questionId]: {
         type: isCorrect ? "success" : "danger",
         message: isCorrect ? "Correct Answer" : "Incorrect Answer",
       },
     }));
   };
    const handleSubmit = () => {
        let score = 0;

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
        setUserAnswers({});

        // Set a timeout to hide the notification after 3 seconds
        setTimeout(() => {
            setNotification(null);
        }, 3000);
        setDone(true);
       
    };

    return (
        <div>
            <div className="bg-purple-200 text-white p-8 space-y-6 max-w-[50rem] mx-auto mt-10 rounded-lg shadow-md">
                <ul >
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

                            {done && 
                            <div>      
                                {answersNotifications[question.id] && (
                                <Notification
                                    message={answersNotifications[question.id].message}
                                    type={answersNotifications[question.id].type}
                                />)
                                }
                            </div>

                            }


                        </li>
                    ))}
                </ul>
                <button
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors mt-4"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            {notification && (
                <Notification  message={notification.message} type={notification.type} />
            )}
        </div>
    );
}

export default AttemptQuiz;
