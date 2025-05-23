import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
export default function Question({ onSkipAnswer, questionText, answers, answerState, selectedAnswer, onSelectedAnswer }) {
    return (
        <div id="question">
            <QuestionTimer timeOut={10000} onTimeOut={onSkipAnswer} />
            <h2>{questionText}</h2>
            <Answers answers={answers}
                answerState={answerState}
                selectedAnswer={selectedAnswer}
                onSelect={onSelectedAnswer} />
        </div>
    )
}
