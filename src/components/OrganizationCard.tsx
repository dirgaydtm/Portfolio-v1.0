import type { SpringOptions } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  organization?: string;
  position?: string;
  borderColor?: string;
  image?: string;
  link?: string;
  animationIn?: string;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  organization,
  position,
  borderColor,
  image,
  link,
  animationIn,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const detectTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.innerWidth < 768
      );
    };

    detectTouchDevice();
    window.addEventListener("resize", detectTouchDevice);

    return () => window.removeEventListener("resize", detectTouchDevice);
  }, []);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (isTouchDevice || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -14;
    const rotationY = (offsetX / (rect.width / 2)) * 14;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    if (isTouchDevice) return;
    scale.set(1.0);
    opacity.set(1);
  }

  function handleMouseLeave() {
    if (isTouchDevice) return;
    scale.set(1);
    opacity.set(0);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <a
      data-aos={animationIn}
      data-aos-duration="500"
      data-aos-anchor-placement="top"
      data-aos-once="true"
      href={link}
      target="_blank"
    >
      <figure
        ref={ref}
        className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
        onMouseMove={handleMouse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative [transform-style:preserve-3d] size-45 md:size-50 lg:size-70 lg:grayscale hover:grayscale-0"
          style={{
            rotateX: isTouchDevice ? 0 : rotateX,
            rotateY: isTouchDevice ? 0 : rotateY,
            scale: isTouchDevice ? 1 : scale,
          }}
        >
          <motion.img
            className={`absolute bg-transparent size-full rounded-2xl will-change-transform [transform:translateZ(0)] border ${borderColor}`}
          />
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            <img
              src={image}
              className="inset-0 object-cover transition-all duration-800 hover:scale-120"
            />
          </motion.div>
        </motion.div>

        {!isTouchDevice && (
          <motion.figcaption
            className="absolute left-0 top-0 rounded-xl bg-white px-[10px] py-[4px] z-[3] hidden lg:block"
            style={{
              x,
              y,
              opacity,
              rotate: rotateFigcaption,
            }}
          >
            <h1 className="text-sm text-black-primary">{organization}</h1>
            <p className="text-xs text-black-primary">{position}</p>
          </motion.figcaption>
        )}

        {/* Mobile fallback text */}
        <div className="text-white lg:hidden text-center m-3">
          <h1 className="text-base  font-semibold ">{organization}</h1>
          <p className="text-sm ">{position}</p>
        </div>
      </figure>
    </a>
  );
}
