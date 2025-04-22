import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  ({ texts }, ref) => {
    const onNext = useCallback(() => {}, []);
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const splitIntoCharacters = (text: string): string[] => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SegmenterConstructor = (Intl as any).Segmenter as
        | {
            new (locale: string, options: { granularity: string }): {
              segment(input: string): Iterable<{ segment: string }>;
            };
          }
        | undefined;
      if (SegmenterConstructor) {
        const segmenter = new SegmenterConstructor("en", {
          granularity: "grapheme",
        });
        const segmentsIterable = segmenter.segment(text);
        return Array.from(segmentsIterable, ({ segment }) => segment);
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const currentText: string = texts[currentTextIndex];
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }, [currentTextIndex, texts]);

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext();
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1 ? 0 : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0 ? texts.length - 1 : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [next, previous, jumpTo, reset]
    );

    useEffect(() => {
      const intervalId = setInterval(next, 4000);
      return () => clearInterval(intervalId);
    }, [next]);

    return (
      <motion.span
        className="flex flex-wrap whitespace-pre-wrap relative text-xl font-bold px-2 sm:px-2 md:px-3 bg-tranparent text-white overflow-hidden justify-center rounded-lg"
        layout
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTextIndex}
            className="flex flex-wrap whitespace-pre-wrap relative"
            layout
            aria-hidden="true"
          >
            {elements.map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0);
              return (
                <span key={wordIndex} className="inline-flex">
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={{ y: "-100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "120%", opacity: 0 }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 200,
                        delay: (previousCharsCount + charIndex) * 0.05,
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace && (
                    <span className="whitespace-pre"> </span>
                  )}
                </span>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
