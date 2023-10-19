/* eslint-disable react/prop-types */
import { useState } from 'react';

function EditQuestion( props ) {
    
    // eslint-disable-next-line react/prop-types
    const initialQuestion = props.ques?.question || '';
    const initialOptions = props.ques?.options || [];
    const initialCorrectOption = props.ques?.correctedOption || '';

    const [question, setQuestion] = useState(initialQuestion);
    const [numberOfOptions, setNumberOfOptions] = useState(initialOptions.length);
    const [options, setOptions] = useState(initialOptions);
    const [correctOption, setCorrectOption] = useState(initialCorrectOption);

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
        console.log({ question, options, correctOption });

        const updatedQuestion={
            id: props.ques.id,
            question:question,
            options:options,
            correctOption:correctOption,
        }

        props.onEditComplete(updatedQuestion);

        // Call backend API to save question, options, and correct option
    };

    return (
        <div className=' bg-gray-200 p-5 '>
        <h1 className='text-[2rem] text-center'>Questions Form</h1>
        <form onSubmit={handleSubmit} className="flex flex-col p-5 pt-2 justify-center items-center min-h-screen">
            <label className="flex flex-col gap-2 mb-4 w-1/2">
                Type Your Question Below:
                <textarea 
                    className="p-2 rounded border shadow-inner w-full"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
            </label>

            <label className="flex flex-col gap-2 mb-4 w-1/2">
                Number of Options:
                <select className="p-2 rounded border shadow-inner w-full" value={numberOfOptions} onChange={handleNumberOfOptionsChange}>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                </select>
            </label>

            <div className="flex flex-col justify-center items-start gap-4 mb-4 w-1/2">
                {options.map((option, index) => (
                    <div key={index} className="flex flex-row items-center gap-4">
                        <label className="flex flex-col w-2/3">
                            Option {index + 1}:
                            <input
                                className="p-2 mt-1 rounded border shadow-inner w-full"
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                        </label>
                        <label className="flex items-center">
                            <input
                                className="mr-2"
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
            <button type="submit" className="p-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
               Done Editing
            </button>
        </form>
        </div>
    );
}

export default EditQuestion;
