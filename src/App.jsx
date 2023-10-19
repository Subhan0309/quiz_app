//import { useState } from 'react'
import './App.css'
import './index.css'
import QuestionForm from './components/QuestionCreation.jsx'
import QuestionsList from './components/QuizQuestions.jsx'
import AttemptQuiz from './components/AttemptQuiz'

function App() {


  return (
    <div>
      {/* <QuestionForm></QuestionForm> */}
      {/* <QuestionsList></QuestionsList> */}
      <AttemptQuiz/>
      
    </div>
  )
}

export default App
