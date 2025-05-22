import { use, useEffect, useState } from "react";

export default function QuestionTimer({ timeOut, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timeOut);
    useEffect(() => {
        const timer = setTimeout(onTimeOut, timeOut);
        return () => {
            clearTimeout(timer);
        }

    }, [onTimeOut, timeOut]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 100);

        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <progress value={remainingTime} max={timeOut} id="question-time" />
    );
}