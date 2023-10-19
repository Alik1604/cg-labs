import React, { useEffect, useRef, useState } from "react";
import { drawGeometrical } from "./implementations/geometrical.js";
import { drawAlgebraic } from "./implementations/algebraic.js";

const FractalCanvas = ({ scale, dx, dy, type }) => {
  const canvasRef = useRef(null);
  const canvasHeight = 600;
  const canvasWidth = 600;

  const [oldScale, setScale] = useState(scale);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawFractal(ctx, canvasWidth, canvasHeight, 256, scale, dx, dy, type);
  }, [scale, dx, dy, type]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "fractal.png";
    a.click();
  };

  return (
    <div className="flex flex-col items-end space-y-2">
      <canvas
        className="rounded-2xl"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />

      <button
        onClick={handleSave}
        type="button"
        className="w-[100px] h-[40px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Зберегти фрактал
      </button>
    </div>
  );
};

export default FractalCanvas;

function drawFractal(
  ctx,
  canvasWidth,
  canvasHeight,
  iterations,
  scale,
  dx,
  dy,
  type
) {
  const iters = {
    i: iterations,
    i1: Math.pow(iterations, 1.1),
    i2: Math.pow(iterations, 1.2),
  };

  if (type === "geometrical") {
    drawGeometrical(ctx, 200, canvasWidth, canvasHeight, 5, scale, dx, dy, 90);
  } else {
    drawAlgebraic(ctx, canvasWidth, canvasHeight, scale, dx, dy, iterations);
  }
}
