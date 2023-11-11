/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';


const QuestionForm = ({ edit, setEdit, questions, setQuestions, notification, setNotification }) => {

    const [question, setQuestion] = useState('');
    const [numberOfOptions, setNumberOfOptions] = useState(2);
    const [options, setOptions] = useState(['', '']);
    const [correctOption, setCorrectOption] = useState('');
    //The marks can be set  according to the instructions
    //const [marks,setMarks]=useState("");
    //const [notification, setNotification] = useState({ message: '', type: '', visible: false });




    //Autofilling the form if Edit button is clicked for the Editing of some Question
    useEffect(() => {
        if (edit.status && questions[edit.index]) {
            const q = questions[edit.index];
            setQuestion(q.question);
            setNumberOfOptions(q.options.length);
            setOptions(q.options);
            setCorrectOption(q.correctOption);
        }
    }, [edit, questions]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleNumberOfOptionsChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setNumberOfOptions(count);
        setOptions(new Array(count).fill(''));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!question.trim()) {
            showNotification("Please enter a question.", 'danger');
            return;
        }

        for (let option of options) {
            if (!option.trim()) {
                showNotification("Please ensure all options are filled in.", 'danger');
                return;
            }
        }

        if (correctOption === '') {
            showNotification("Please select a correct option.", 'danger');
            return;
        }
        
        if (new Set(options).size !== options.length) {
            showNotification("No two options can be the same.",'danger');
            return;
        }

        if (edit.status) {
            const updatedQuestions = [...questions];
            updatedQuestions[edit.index] = { question, options, correctOption };
            setQuestions(updatedQuestions);
            setEdit({ index: -1, status: false });  // Reset the edit state
            showNotification("Question Edited", 'success');
        } else {
            setQuestions([...questions, { question, options, correctOption }]);
            showNotification("Question Added", 'success');
        }

        // Reset the form
        setQuestion('');
        setNumberOfOptions(2);
        setOptions(new Array(2).fill(''));
        setCorrectOption('');
    };

    // Helper function to display notifications
    const showNotification = (message, type) => {
        setNotification({ message: message, type: type, visible: true });
        setTimeout(() => setNotification({ ...notification, visible: false }), 3000);
    };


    return (
        <div className='relative left-0 top-[0%] bg-white p-6 w-2/5 rounded-lg shadow-lg m-8 border border-gray-200'>          
    
            <h1 className='text-[2.5rem] font-semibold text-center mb-4'>Questions Form</h1>
            <form onSubmit={handleSubmit} className="flex flex-col p-4 justify-start items-center space-y-4">
                <label className="flex flex-col gap-2 w-full">
                    Type Your Question Below:
                    <textarea
                        className="p-2 rounded border shadow-sm w-full resize-none transition duration-200 hover:border-blue-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows="4"
                    ></textarea>
                </label>
    
                <label className="flex flex-col gap-2 w-full">
                    Number of Options:
                    <select className="p-2 rounded border shadow-sm w-full transition duration-200 hover:border-blue-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        value={numberOfOptions} onChange={handleNumberOfOptionsChange}>
                        <option value={2}>2</option>
                        <option value={4}>4</option>
                    </select>
                </label>
    
                <div className="flex flex-col justify-center items-start gap-4 w-full">
                    {options.map((option, index) => (
                        <div key={index} className="flex flex-row items-center gap-4 w-full">
                            <label className="flex flex-col w-2/3">
                                Option {index + 1}:
                                <input
                                    className="p-2 mt-1 rounded border shadow-sm w-full transition duration-200 hover:border-blue-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                            </label>
                            <label className="flex items-center">
                                <input
                                    className="mr-2 transform scale-150 transition duration-200 hover:ring-2 hover:ring-blue-400 focus:ring-2 focus:ring-blue-600"
                                    type="radio"
                                    name="correctOption"
                                    value={index}
                                    checked={correctOption === index.toString()}
                                    onChange={(e) => setCorrectOption(e.target.value)}
                                />
                                Correct
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit" className="w-[100px] text-white px-4 py-2 rounded  bg-blue-600  hover:bg-blue-700 focus:outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-colors">
                    {edit.status ? "Edit" : "Add"}
                </button>
            </form>
          
        </div>
    );
    
    
}

export default QuestionForm;
//Remember to adjust the parent component to reset the edit prop when the form is submitted.






