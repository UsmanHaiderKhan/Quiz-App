import { useCallback, useState, useRef } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

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
            <Summary userAnswers={userAnswers} />
        )
    }



    return (
        <div id="quiz">
            <Question questionIndex={activeQuestionIndex}
                onSelectedAnswer={handleSelectedAnswer}
                onSkipAnswer={handleSkipAnswer}
            />

        </div>
    )
}
