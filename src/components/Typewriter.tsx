import { useState, useEffect } from "react";

const Typewriter: React.FC<{
  text: string;
  speed?: number;
  loop?: boolean;
}> = ({ text, speed = 150, loop = true }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text[index]);
      setIndex((prevIndex) => prevIndex + 1);
    }, speed);

    if (index === text.length) {
      clearInterval(interval);
      if (loop) {
        setTimeout(() => {
          setDisplayText("");
          setIndex(0);
        }, 1000); // restart after 1 second
      }
    }

    return () => clearInterval(interval);
  }, [index, text, speed, loop]);

  return <span>{displayText}</span>;
};

export default Typewriter;
