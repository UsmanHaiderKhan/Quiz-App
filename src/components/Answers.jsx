import { useRef } from 'react';
export default function Answers({ answers, selectedAnswer, onSelect, answerState }) {
    const shuffledAnswers = useRef();
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';
                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected';
                }
                if ((answerState === 'wrong' && answerState === 'correct') && isSelected) {
                    cssClass = answerState;

                }
                return (
                    <li key={answer} className="answer">
                        <button onClick={() => onSelect(answer)} className={cssClass} disabled={answerState !== ''}>{answer}</button>
                    </li>
                )
            })}

        </ul>
    )
} 