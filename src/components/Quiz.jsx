import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    function handleAnswerClick(answer) {
        setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
    }

    return (
        <div id="quiz">
            <div id="question">
                <p>{QUESTIONS[activeQuestionIndex].text}</p>
                <ul id="answers">
                    {QUESTIONS[activeQuestionIndex].answers.map((answer, index) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleAnswerClick(answer)}>{answer}</button>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}
