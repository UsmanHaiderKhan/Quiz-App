import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions.js";
export default function Question({ questionIndex, onSkipAnswer, onSelectedAnswer }) {
    const [answer, setAnswer] = useState({ selectedAnswer: '', isCorrect: null });

    let timer = 10000; // 10 seconds
    if (answer.selectedAnswer) {
        timer = 1000; // 1 second
    }
    if (answer.isCorrect !== null) {
        timer = 2000; // 2 seconds
    }
    function handleSelectedAnswer(answer) {
        setAnswer({
            selectedAnswer: '',
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[questionIndex].answers[0] === answer
            });
            setTimeout(() => {
                onSelectedAnswer(answer);
            }, 2000);
        }, 1000);


    }
    let answerState = ''
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer key={timer} timeOut={timer} onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null} mode={answerState} />
            <h2>{QUESTIONS[questionIndex].text}</h2>
            <Answers answers={QUESTIONS[questionIndex].answers}
                answerState={answerState}
                selectedAnswer={answer.selectedAnswer}
                onSelect={handleSelectedAnswer} />
        </div>
    )
}
