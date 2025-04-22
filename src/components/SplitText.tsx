import { useSprings, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text?: string;
  className?: string;
}

const SplitText: React.FC<SplitTextProps> = ({ text = "", className = "" }) => {
  const lines = text.split("\n");
  const words = lines.map((line) => line.split(" "));
  const letters = words.flat().flatMap((word) => word.split(""));
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: { opacity: 0, transform: "translate3d(0,-30px,0)" },
      to: inView
        ? { opacity: 1, transform: "translate3d(0,0,0)" }
        : { opacity: 0, transform: "translate3d(0,-30px,0)" },
      delay: i * 50,
      config: { easing: (t: number) => t },
    }))
  );

  let letterIndex = 0;

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden whitespace-normal break-words font-semibold text-white text-center ${className}`}
    >
      {words.map((lineWords, lineIndex) => (
        <span key={lineIndex} className="block">
          {lineWords.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split("").map((letter) => {
                const animatedLetter = (
                  // @ts-expect-error animated span accepts children and spring style
                  <animated.span
                    key={letterIndex}
                    style={springs[letterIndex]}
                    className="inline-block transform transition-opacity will-change-transform"
                  >
                    {letter}
                  </animated.span>
                );
                letterIndex++;
                return animatedLetter;
              })}
              <span>&nbsp;</span>
            </span>
          ))}
        </span>
      ))}
    </p>
  );
};

export default SplitText;
