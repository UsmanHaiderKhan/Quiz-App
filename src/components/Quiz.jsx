import { useCallback, useState, useRef } from "react";
import QUESTIONS from "../questions.js";
import imgTrophy from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {

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



    return (
        <div id="quiz">
            <Question key={activeQuestionIndex} questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSelectedAnswer={handleSelectedAnswer}
                onSkipAnswer={handleSkipAnswer}
            />

        </div>
    )
}
