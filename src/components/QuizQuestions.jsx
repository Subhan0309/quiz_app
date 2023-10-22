/* eslint-disable react/prop-types */

import React from "react";

function QuizQuestions({ setEdit, questions,setQuestions }) {

    //const [quizQuestions, setQuizQuestions] = React.useState([]);

    React.useEffect(() => {
        setQuestions(questions);
    }, [questions]);


    
    const handleDelete = (indexToDelete) => {
        const updatedQuizzes = questions.filter((_, index) => index !== indexToDelete);
        setQuestions(updatedQuizzes);
    };
    const handleEdit = (index) => {
        setEdit({
            index,
            status: true,
        });

    };

    // useEffect(() => {
    //   const fetchQuizzes = async () => {
    //     const response = await axios.get("BACKEND_URL/quizzes");
    //     setQuizzes(response.data);
    //   };

    //   fetchQuizzes();
    // }, []);
    // React.useEffect(()=>{
    //     setQuestions(quizQuestions);
    // },[quizQuestions]);

    return (

        <div className="bg-gray-100 p-5 space-y-6 w-3/5 h-full overflow-y-auto relative m-8 top-0  right-0 shadow-md rounded-lg">
            {questions.length > 0 ? (
                <>
                    <h1 className="text-black font-bold text-3xl text-center">Questions List</h1>
                    <ul className="bg-gray-100 p-5 space-y-6 max-w-[50rem]  mt-5 ">
                        {questions.map((question, index) => (
                            // Question heading and options
                            <li key={question.id} className="bg-white p-5 rounded-lg shadow-sm">
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
                                        onClick={() => handleEdit(index)}>
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 w-[100px] text-white px-4 py-2 rounded hover:bg-red-600 transition-colors m-4"
                                        onClick={() => handleDelete(index)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul></>
            ) : (
                <div>
                    <h1 className="font-bold text-xl">No Questions to display</h1>
                </div>
            )}


            {questions.length > 0 && (
                <div>
                    <button
                        className="bg-green-500 w-[100px] text-white px-4 py-2 rounded hover-bg-green-600 transition-colors m-4"
                    >
                        {/* apply the handle submit function and Update the passed global state copying the elements from local state */}
                        Submit
                    </button>
                </div>
            )}
        </div>


    );
}

export default QuizQuestions;
