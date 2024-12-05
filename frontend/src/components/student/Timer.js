import React, { useEffect, useState } from "react";

const Timer = ({ duration, onTimeUp }) => {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      onTimeUp();
    }
  }, [seconds, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return <div>Time Left: {formatTime(seconds)}</div>;
};

export default Timer;