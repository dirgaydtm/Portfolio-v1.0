import { useRef, useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";

const AnimatedSpan = animated.span as React.FC<
  React.HTMLAttributes<HTMLSpanElement>
>;

interface BlurTextProps {
  text?: string;
}

const BlurText: React.FC<BlurTextProps> = ({text = ""}) => {
  const elements = text.split(" ");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

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
      { threshold: 0.1, rootMargin: "0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: {
        filter: "blur(10px)",
        opacity: 0,
        transform: "translate3d(0,50px,0)",
      },
      to: inView
        ? async (next: (props: Record<string, string | number>) => Promise<void>) => {
            await next({
              filter: "blur(5px)",
              opacity: 0.5,
              transform: "translate3d(0,-5px,0)",
            });
            await next({
              filter: "blur(0px)",
              opacity: 1,
              transform: "translate3d(0,0,0)",
            });
            animatedCount.current += 1;
          }
        : {
            filter: "blur(10px)",
            opacity: 0,
            transform: "translate3d(0,50px,0)",
          },
      delay: i * 20,
      config: { easing: (t: number) => t },
    }))
  );

  return (
    <p ref={ref} className="text-center lg:text-justify text-sm lg:my-3 lg:text-base text-gray-300 max-w-120 lg:m-0 ">
      {springs.map((props, index) => (
        <AnimatedSpan
          key={index}
          style={props}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {elements[index]}
          {index < elements.length - 1 && " "}
        </AnimatedSpan>
      ))}
    </p>
  );
};

export default BlurText;
