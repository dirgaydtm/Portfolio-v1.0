import { useRef, useEffect, useState } from "react";

interface GridOffset {
  x: number;
  y: number;
}

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / 40) + 1;
      numSquaresY.current = Math.ceil(canvas.height / 40) + 1;
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx || isMobile) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / 40) * 40;
      const startY = Math.floor(gridOffset.current.y / 40) * 40;

      for (let x = startX; x < canvas.width + 40; x += 40) {
        for (let y = startY; y < canvas.height + 40; y += 40) {
          const squareX = x - (gridOffset.current.x % 40);
          const squareY = y - (gridOffset.current.y % 40);

          ctx.strokeStyle = "#262626";
          ctx.strokeRect(squareX, squareY, 40, 40);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "#00000000");
      gradient.addColorStop(1, "#060606");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      if (!isMobile) {
        const effectiveSpeed = Math.max(0.4, 0.1);
        gridOffset.current.x =
          (gridOffset.current.x - effectiveSpeed + 40) % 40;
        gridOffset.current.y =
          (gridOffset.current.y - effectiveSpeed + 40) % 40;
        drawGrid();
      }
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      className="size-full absolute z-0"
    ></canvas>
  );
};

export default Background;
