import React, { useEffect, useRef, useState } from 'react';
import { fillTriangle, rotateVector, getSides } from "./triangle.js";

const FractalCanvas = ({scale, dx, dy}) => {
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

  return (<canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}/>);
};

export default FractalCanvas;

function drawFractal(ctx, canvasWidth, canvasHeight, iterations, scale, dx, dy) {
  const iters = {
    i: iterations,
    i1: Math.pow(iterations, 1.1),
    i2: Math.pow(iterations, 1.2)
  }

  algebraic(canvasWidth, canvasHeight, ctx, scale, iterations, dx, dy)
  
  // geometrical(ctx, 150, canvasWidth, canvasHeight, 8, scale, dx, dy)
}

function algebraic(canvasWidth, canvasHeight, ctx, scale, iterations, dx, dy) {
  const offsetX = canvasWidth / 2; 
  const offsetY = canvasHeight / 2; 
  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      const a = (x - offsetX) / scale + canvasWidth / 2 / 100 * dx / 100;
      const b = (y - offsetY) / scale + canvasHeight / 2 / 100 * dy / 100;
      
      const t = fractal1(a, b, iterations);

      // ctx.fillStyle = getColor(za, zb, n, iters, (2.0 * t + 0.5) % 1.0);
      ctx.fillStyle = hsvToRgb(t.n, t.iterations, t.z)
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function fractal1(a, b, iterations) {
  const c = { x: -0.5, y: 0.1 }
  var z = { x: a, y: b }
  
  let n = 0;

  // z * sin(z)
  while (n < iterations) {  
    z = addz(mulz(z, sinz(z)), c)

    if (modz(z) < 0.001 || modz(z) > 16) {
      break; 
    }

    n++;
  }

  // return (n - Math.log2(modz(z))) / iterations
  return {
    n: n,
    iterations: iterations,
    z: z
  }
}

function fractal2(a, b, iterations) {
  const c = { x: 0.01, y: 0.3 }
  var z = { x: a, y: b }
  
  let n = 0;

  // cosz(z) * sin(z)
  while (n < iterations) {   
    z = mulz(c, divz(cosz(z), sinz(z)))
    // z = mulz(c, sinz(z))
    // z = divz(cosz(z), sinz(z))

    if (modz(z) < 0.001 || modz(z) > 4) {
      break; 
    }

    n++;
  }

  // return (n - Math.log2(modz(z))) / iterations
  return {
    n: n,
    iterations: iterations,
    z: z
  }
}

function geometrical(ctx, triangleSize, canvasWidth, canvasHeight, iterations, scale, dx, dy) {
  const centerX = canvasWidth / 2 + canvasWidth * dx / 20000 * scale;
  const centerY = canvasHeight / 2 + canvasHeight * dy / 20000 * scale;

  const rTSize = triangleSize * scale / 100

  const v = {
    x: 0,
    y: rTSize * Math.sqrt(3) / 6 
  }
  const triangle = fillTriangle({
    center: {
      x: centerX,
      y: centerY
    },
    v1: rotateVector(v, 0),
    v2: rotateVector(v, 120),
    v3: rotateVector(v, 240),
    vx1: { x: 0, y: 0 },
    vx2: { x: 0, y: 0 },
    vx3: { x: 0, y: 0 },
  })

  ctx.strokeStyle = "black"
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  ctx.strokeStyle = "white"
  ctx.lineWidth = 1

  const sides = getSides(triangle)

  geomIterate(ctx, sides.s1, iterations)
  geomIterate(ctx, sides.s2, iterations)
  geomIterate(ctx, sides.s3, iterations)
}

function geomIterate(ctx, side, iterations) {
  if (iterations == 0) {
    ctx.beginPath()
    ctx.moveTo(side.vx.x, side.vx.y)
    ctx.lineTo(side.vx.x + side.v.x, side.vx.y + side.v.y)
    ctx.stroke()
  } else {
    geomIterate(ctx, {
      vx: { x: side.vx.x, y: side.vx.y },
      v: { x: side.v.x / 3, y: side.v.y / 3 }
    }, iterations - 1)

    const rotatedVectorByM60 = rotateVector({ x: side.v.x / 3, y: side.v.y / 3 }, -60)
    geomIterate(ctx, {
      vx: { x: side.vx.x + side.v.x / 3, y: side.vx.y + side.v.y / 3 },
      v: rotatedVectorByM60
    }, iterations - 1)

    geomIterate(ctx, {
      vx: { x: side.vx.x + side.v.x / 3 + rotatedVectorByM60.x, y: side.vx.y + side.v.y / 3 + rotatedVectorByM60.y },
      v: rotateVector({ x: side.v.x / 3, y: side.v.y / 3 }, 60)
    }, iterations - 1)

    geomIterate(ctx, {
      vx: { x: side.vx.x + side.v.x * 2 / 3, y: side.vx.y + side.v.y * 2 / 3},
      v: { x: side.v.x / 3, y: side.v.y / 3 }
    }, iterations - 1)
  }
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

function hsvToRgb(n, iterations, z) {
  // const ti = Math.abs(n - Math.log2(Math.log2(modz(z)))) / iterations
  const ti = n / iterations
  // console.log("" + ti + " " + (n - Math.log2(Math.log2(modz(z)))) / iterations)
  const tin = 1 - ti
  // const h = Math.pow((n / iterations) * 360, 1.5) % 360
  // const h = Math.pow(((n - Math.log2(modz(z))) / iterations) * 360, 1.5) % 360
  // const h = n - Math.log2(Math.abs(Math.log10(Math.abs(modz(z)))/Math.log10(iterations)))
  // const sexp = 1.5
  // const h = Math.pow(Math.pow(n / iterations, sexp) * iterations, 1.5) % iterations
  // const h = ti * Math.pow(tin, 10 / tin) * 360
  const h = -ti * Math.pow(tin, 1.5) + 230 / 360 //* Math.pow(ti, 5)
  const s = 1 
  const v = 0.6 + Math.pow(tin, 1.5)

  // console.log(h)

  const rbin = 255
  const gbin = 255
  const bbin = 255
  let red, green, blue;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  // console.log("" + i + " | " + f + " | " + p + " | " + q + " | " + t)

  switch (i % 6) {
    case 0:
      red = v;
      green = t;
      blue = p;
      break;
    case 1:
      red = q;
      green = v;
      blue = p;
      break;
    case 2:
      red = p;
      green = v;
      blue = t;
      break;
    case 3:
      red = p;
      green = q;
      blue = v;
      break;
    case 4:
      red = t;
      green = p;
      blue = v;
      break;
    case 5:
      red = v;
      green = p;
      blue = q;
      break;
  }

  const alpha = 1

  // console.log("" + red * rbin + " " + green * gbin + " " + blue * bbin)
  return `rgb(${red * rbin * alpha}, ${green * gbin * alpha}, ${blue * bbin * alpha})`
}