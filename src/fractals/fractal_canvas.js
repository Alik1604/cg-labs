import React, { useEffect, useRef, useState } from "react";
import { drawGeometrical } from "./implementations/geometrical.js";
import { drawAlgebraic } from "./implementations/algebraic.js";
import { Button } from "flowbite-react";

const FractalCanvas = ({ scale, dx, dy, type, palette }) => {
  const canvasRef = useRef(null);
  const canvasHeight = 600;
  const canvasWidth = 600;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawFractal(
      ctx,
      canvasWidth,
      canvasHeight,
      256,
      scale,
      dx,
      dy,
      type,
      palette
    );
  }, [scale, dx, dy, type, palette]);

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

      <Button onClick={handleSave}>Зберегти фрактал</Button>
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
  type,
  palette
) {
  if (type === "g") {
    drawGeometrical(ctx, 200, canvasWidth, canvasHeight, 5, scale, dx, dy, 172);
  } else {
    drawAlgebraic(
      ctx,
      canvasWidth,
      canvasHeight,
      scale,
      dx,
      dy,
      iterations,
      type,
      palette
    );
  }
}
