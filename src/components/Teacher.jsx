
import { useState } from 'react'
import QuestionForm from './QuestionCreation.jsx'
import QuestionsList from './QuizQuestions.jsx'
import Notification from './Notification.jsx'

const Teacher = () => {
  //Title and Quiz Questions are under .
  const [title, setTitle] = useState("");
  const [Questions, setQuestions] = useState([]);


  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  const [titleGiven, setTitleGiven]=useState(false);

  const [edit, setEdit] = useState({
    index: -1,
    status: false,
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showNotification("Please enter a question.", 'danger');
      return;

    }
    // Helper function to display notifications
    const showNotification = (message, type) => {
      setNotification({ message: message, type: type, visible: true });
      setTimeout(() => setNotification({ ...notification, visible: false }), 3000);
    };
    setTitleGiven(true);
  }


  return (
    <>
      {!titleGiven ? (
        <div className="bg-purple-200 text-white p-8 space-y-6 w-[400px] max-w-[65rem] mx-auto my-10 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col w-[300px] p-4 justify-center items-center space-y-4">
            <label className="flex flex-col gap-2 w-full text-black">
              Enter The Title of your Quiz
              <input
                className="p-2 rounded border shadow-sm w-full resize-none transition duration-200 hover:border-blue-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows="4"
              ></input>
            </label>
            <div className="w-full flex justify-center">
              <button
                className="bg-orange-500 text-white w-2/5 px-4 py-2 rounded hover:bg-orange-600 transition-colors mt-4"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Render the other content when title is assigned
        <div className='flex flex-col h-full bg-black'>
          {/* Show Notification component */}
          {notification.visible && <Notification message={notification.message} type={notification.type} visible={notification.visible} />}
  
          {/* Heading */}
          <div className='w-full flex-col items-center justify-center bg-blue-300 p-10'>
            <h1 className='text-center font-bold text-3xl'>The Title of Quiz is : {title}</h1>
          </div>
  
          {/* Main Content */}
          <div className='flex flex-row w-full flex-grow'>
            <QuestionForm edit={edit} setEdit={setEdit} questions={Questions} setQuestions={setQuestions} notification={notification} setNotification={setNotification} />
            <QuestionsList setEdit={setEdit} questions={Questions} setQuestions={setQuestions} />
          </div>
        </div>
      )}
    </>
  );
  

   
}



export default Teacher