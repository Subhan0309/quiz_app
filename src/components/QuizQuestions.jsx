import Questions from "../quizzes";
import React from "react";
import EditQuestion from "./EditQuestion";

function QuizQuestions() {

    const [quizQuestions, setQuizQuestions] = React.useState(Questions);
    const [editedQuestion, setEditedQuestion] = React.useState(null);
    const [editing, setEditing] = React.useState(false);

    const handleDelete = (id) => {
        const updatedQuizzes = [];

        for (let index = 0; index < quizQuestions.length; index++) {
            if (quizQuestions[index].id !== id) {
                updatedQuizzes.push(quizQuestions[index]);
            }
        }

        setQuizQuestions(updatedQuizzes); // assuming you have a state management setup with `setQuizzes`
    };
    const handleEditComplete = (updatedQuestion) => {

        setQuizQuestions(prevQuestions =>
            prevQuestions.map(q =>
                q.id === updatedQuestion.id ? updatedQuestion : q
            )
        );
        setEditedQuestion(null);
        setEditing(null);
    };
    const handleEdit = (id) => {
        setEditedQuestion(quizQuestions.find(q => q.id === id));
        setEditing(true);

    };

    // useEffect(() => {
    //   const fetchQuizzes = async () => {
    //     const response = await axios.get("BACKEND_URL/quizzes");
    //     setQuizzes(response.data);
    //   };

    //   fetchQuizzes();
    // }, []);

    return (

        <div className="bg-gray-100 p-8 space-y-6 max-w-[50rem] mx-auto mt-10 rounded-lg shadow-md">
    {editing ? (
        <EditQuestion
            ques={editedQuestion}
            onEditComplete={handleEditComplete}
        />
    ) : (
        quizQuestions.length > 0 ? (
            <ul className="bg-gray-100 p-8 space-y-6 max-w-[50rem] mx-auto mt-10 ">
                {quizQuestions.map(question => (
                    // Question heading and options
                    <li key={question.id} className="bg-white p-6 rounded-lg shadow-sm">
                        <h1 className="text-xl text-start font-semibold mb-4">
                            {question.question}
                        </h1>
                        
                        <ul className="space-y-2 pl-5 flex flex-col items-start">
                            {question.options.map((option, index) => (
                                <li key={index} className="list-disc">{option}</li>
                            ))}
                        </ul>

                        {/* buttons for editing and deletion */}
                        <div className="flex justify-end items-center mt-4">
                            <button
                                className="bg-blue-500 w-[100px] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors m-4"
                                onClick={() => handleEdit(question.id)}>
                                Edit
                            </button>
                            <button
                                className="bg-red-500 w-[100px] text-white px-4 py-2 rounded hover:bg-red-600 transition-colors m-4"
                                onClick={() => handleDelete(question.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        ):(
            <div>
                    <h1 className="font-bold text-xl">No Questions to display</h1>
            </div>
        )
    )}

    {quizQuestions.length > 0 && (
        <div>
            <button
                className="bg-green-500 w-[100px] text-white px-4 py-2 rounded hover-bg-green-600 transition-colors m-4"
            >
                Submit
            </button>
        </div>
    )}
</div>

        
        );
    }

export default QuizQuestions;
