
import { useState } from 'react'
import QuestionForm from './QuestionCreation.jsx'
import QuestionsList from './QuizQuestions.jsx'
import Notification from './Notification.jsx'

const Teacher = () => {
  const [Questions, setQuestions] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const [edit,setEdit]=useState({
    index:-1,
    status:false,
  });

  return (
    <div className='flex flex-col h-full bg-black'>
    {/* Show Notification component */}
    {notification.visible && <Notification message={notification.message} type={notification.type} visible={notification.visible} />}

    {/* Heading */}
    <div className='w-full bg-blue-300 p-10'>
        <h1 className='text-center font-bold text-3xl'>Teacher Work Space</h1>
    </div>

    {/* Main Content */}
    <div className='flex flex-row w-full flex-grow'>
        <QuestionForm edit={edit} setEdit={setEdit} questions={Questions} setQuestions={setQuestions} notification={notification} setNotification={setNotification}/>
        <QuestionsList setEdit={setEdit} questions={Questions} setQuestions={setQuestions}/>
    </div>
</div>

  )
}

  

export default Teacher