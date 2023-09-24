import React, { useEffect, useRef, useState } from 'react';

const FractalCanvas = ({scale}) => {
  const canvasRef = useRef(null);
  const canvasHeight = 600;
  const canvasWidth = 600;

  const [oldScale, setScale] = useState(scale);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    console.log("old " + oldScale);
    console.log("new " + scale);
    if (oldScale !== scale) {
      drawSinFractal(ctx, canvasWidth, canvasHeight, 256, scale);
    }
  }, [scale]);

  return (<canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />);
};

export default FractalCanvas;

function drawSinFractal(ctx, canvasWidth, canvasHeight, iterations, scale) {
  const iters = {
    i: iterations,
    i1: Math.pow(iterations, 1.1),
    i2: Math.pow(iterations, 1.2)
  }

  const offsetX = canvasWidth / 2; // Зміщення по горизонталі
  const offsetY = canvasHeight / 2; // Зміщення по вертикалі

  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      const a = (x - offsetX) / scale;
      const b = (y - offsetY) / scale;
      
      const t = fractal2(a, b, iterations);

      // ctx.fillStyle = getColor(za, zb, n, iters, (2.0 * t + 0.5) % 1.0);
      // console.log(t);
      ctx.fillStyle = getColor(t);
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function fractal1(a, b, iterations) {
  const c = { x: -0.03, y: 0.05 }
  var z = { x: a, y: b }
  
  let n = 0;

  // z * sin(z)
  while (n < iterations) {  
    z = addz(mulz(z, sinz(z)), c)

    if (modz(z) < 0.01 || modz(z) > 128) {
      break; 
    }

    n++;
  }

  return (n - Math.log2(modz(z))) / iterations
}

function fractal2(a, b, iterations) {
  const c = { x: 0.01, y: 0.2 }
  var z = { x: a, y: b }
  
  let n = 0;

  // cosz(z) * sin(z)
  while (n < iterations) {   
    z = mulz(c, divz(cosz(z), sinz(z)))

    if (modz(z) < 0.01 || modz(z) > 4) {
      break; 
    }

    n++;
  }

  return (n - Math.log2(modz(z))) / iterations
}

function sinz(z) {
  return {
    x: Math.sin(z.x) * Math.cosh(z.y),
    y: Math.cos(z.x) * Math.sinh(z.y)
  }
}

function cosz(z) {
  return {
    x: Math.cos(z.x) * Math.cosh(z.y),
    y: -Math.sin(z.x) * Math.sinh(z.y)
  }
}

function addz(z1, z2) {
  return {
    x: z1.x + z2.x,
    y: z1.y + z2.y
  }
}

function mulz(z1, z2) {
  return {
    x: z1.x * z2.x - z1.y * z2.y,
    y: z1.x * z2.y + z1.y * z2.x
  }
}

function divz(z1, z2) {
  const delimiter = modz(z2)
  return {
    x: (z1.x * z2.x + z1.y * z2.y) / delimiter,
    y: (z1.y * z2.x + z1.x * z2.y) / delimiter
  }
}

function modz(z) {
  return z.x * z.x + z.y * z.y
}

function getColor(ti) {
  const t = Math.abs(ti) % 1.0 * 100
  const bin = 255

  const a = { f: 0.5, s: 0.5, t: 0.5 };
  const b = { f: 0.5, s: 0.5, t: 0.5 };
  const c = { f: 1, s: 1, t: 1 };
  const d = { f: 0.1, s: 0.15, t: 0.3 };

  var red = 0
  var green = 0
  var blue = 0

  if (t < 33) {
    red = bin * (b.f * Math.cos(6.28318 * (c.f * t + d.f)) + a.f) / 2 - 50
    green = bin * (b.s * Math.cos(6.28318 * (c.s * t + d.s)) + a.s) / 2 - 100
    blue = bin * (b.t * Math.cos(6.28318 * (c.t * t + d.t)) + a.t) 

  } else if (t < 66) {
    red = bin * (b.f * Math.cos(6.28318 * (c.f * t + d.f)) + a.f) / 2
    green = bin * (b.s * Math.cos(6.28318 * (c.s * t + d.s)) + a.s) / 1.5 - 50
    blue = bin * (b.t * Math.cos(6.28318 * (c.t * t + d.t)) + a.t)
  
  } else {
    red = bin * (b.f * Math.cos(6.28318 * (c.f * t + d.f)) + a.f) - 50
    green = bin * (b.s * Math.cos(6.28318 * (c.s * t + d.s)) + a.s) / 1.5 - 50
    blue = bin * (b.t * Math.cos(6.28318 * (c.t * t + d.t)) + a.t)
  
  }
  
  return `rgb(${red}, ${green}, ${blue})`;
}