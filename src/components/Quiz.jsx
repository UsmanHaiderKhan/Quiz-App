import { useCallback, useState, useRef } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";
import imgTrophy from "../assets/quiz-complete.png";

export default function Quiz() {
    const shuffledAnswers = useRef();
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsOver = activeQuestionIndex === QUESTIONS.length;
    const handleSelectedAnswer = useCallback(function handleAnswerClick(answer) {
        setAnswerState('answered');
        setUserAnswers((prevAnswers) => [...prevAnswers, answer]);

        setTimeout(() => {
            if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('incorrect');
            }
            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);
    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

    if (quizIsOver) {
        return (
            <div id="summary">
                <img src={imgTrophy} alt="Trophy" />
                <h2>Quiz is over</h2>
                {/* <p>Your score is {userAnswers.filter((answer, index) => answer === QUESTIONS[index].correctAnswer).length} out of {QUESTIONS.length}</p> */}
            </div>
        )
    }
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5);
    }

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeOut={10000} onTimeOut={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.current.map((answer) => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClass = '';
                        if (answerState === 'answered' && isSelected) {
                            cssClass = 'selected';
                        }
                        if ((answerState === 'incorrect' && answerState === 'correct') && isSelected) {
                            cssClass = answerState;
                        }
                        return (
                            <li key={answer} className="answer">
                                <button onClick={() => handleSelectedAnswer(answer)} className={cssClass}>{answer}</button>
                            </li>
                        )
                    })}

                </ul>
            </div>
        </div>
    )
}
