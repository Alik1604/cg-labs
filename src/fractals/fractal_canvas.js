import React, { useEffect, useRef, useState } from 'react';
import { drawGeometrical } from "./implementations/geometrical.js";
import { drawAlgebraic } from "./implementations/algebraic.js";

const FractalCanvas = ({ scale, dx, dy }) => {
  const canvasRef = useRef(null);
  const canvasHeight = 600;
  const canvasWidth = 600;

  const [oldScale, setScale] = useState(scale);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawFractal(ctx, canvasWidth, canvasHeight, 256, scale, dx, dy);
  }, [scale, dx, dy]);

  return (<canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />);
};

export default FractalCanvas;

function drawFractal(ctx, canvasWidth, canvasHeight, iterations, scale, dx, dy) {
  const iters = {
    i: iterations,
    i1: Math.pow(iterations, 1.1),
    i2: Math.pow(iterations, 1.2)
  }

  drawAlgebraic(canvasWidth, canvasHeight, ctx, scale, iterations, dx, dy)
  // drawGeometrical(ctx, 200, canvasWidth, canvasHeight, 6, scale, dx, dy, 90)
}