import { useCallback, useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";
import imgTrophy from "../assets/quiz-complete.png";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsOver = activeQuestionIndex === QUESTIONS.length;
    const handleSelectedAnswer = useCallback(function handleAnswerClick(answer) {
        setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
    }, []);
    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

    if (quizIsOver) {
        return (
            <div id="summary">
                <img src={imgTrophy} alt="Trophy" />
                <h2>Quiz is over</h2>
                <p>Your score is {userAnswers.filter((answer, index) => answer === QUESTIONS[index].correctAnswer).length} out of {QUESTIONS.length}</p>
            </div>
        )
    }
    const shuffledAnswer = QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeOut={10000} onTimeOut={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswer.map((answer, index) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleAnswerClick(answer)}>{answer}</button>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}
