import React, { useRef, useEffect } from "react";

const ClickSpark = ({ children }: { children: React.ReactNode }) => {
  const sparkSize = 20;
  const sparkRadius = 30;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<
    { x: number; y: number; angle: number; startTime: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const resizeCanvas = () => {
      const { width, height } =
        canvas.parentElement?.getBoundingClientRect() ?? {
          width: 0,
          height: 0,
        };
      canvas.width = width;
      canvas.height = height;
    };

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas.parentElement);
    resizeCanvas();

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= 400) return false;

        const progress = elapsed / 400;
        const eased = progress * (2 - progress);
        const distance = eased * sparkRadius;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.beginPath();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  }, [sparkRadius, sparkSize]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    sparksRef.current.push(
      ...Array.from({ length: 8 }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / 8,
        startTime: performance.now(),
      }))
    );
  };

  return (
    <div className="relative  w-full h-full" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute z-1 inset-0 pointer-events-none"
      />
      {children}
    </div>
  );
};

export default ClickSpark;
