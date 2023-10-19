import { getColor, hsvToRgb, getAlgebraicColor } from "./utils/colors.js";

export function drawAlgebraic(
  ctx,
  canvasWidth,
  canvasHeight,
  scale,
  dx,
  dy,
  iterations,
  type,
  palette
) {
  const offsetX = canvasWidth / 2;
  const offsetY = canvasHeight / 2;

  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      const a = (x - offsetX) / scale + (canvasWidth * dx) / 20000;
      const b = (y - offsetY) / scale + (canvasHeight * dy) / 20000;

      const t = type === "a1" ? fractal1(a, b, iterations) : fractal2(a, b, iterations);

      // ctx.fillStyle = getColor(za, zb, n, iters, (2.0 * t + 0.5) % 1.0);
      // ctx.fillStyle = hsvToRgb(t.n, t.iterations, t.z)
      ctx.fillStyle = getAlgebraicColor(t.n, t.iterations, palette);
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function fractal1(a, b, iterations) {
  const c = { x: -0.5, y: 0.1 };
  var z = { x: a, y: b };

  let n = 0;

  // z * sin(z)
  while (n < iterations) {
    z = addz(mulz(z, sinz(z)), c);

    if (modz(z) < 0.001 || modz(z) > 16) {
      break;
    }

    n++;
  }

  // return (n - Math.log2(modz(z))) / iterations
  return {
    n: n,
    iterations: iterations,
    z: z,
  };
}

function fractal2(a, b, iterations) {
  const c = { x: 0.01, y: 0.3 };
  var z = { x: a, y: b };

  let n = 0;

  // cosz(z) * sin(z)
  while (n < iterations) {
    z = mulz(c, divz(cosz(z), sinz(z)));
    // z = mulz(c, sinz(z))
    // z = divz(cosz(z), sinz(z))

    if (modz(z) < 0.001 || modz(z) > 5) {
      break;
    }

    n++;
  }

  // return (n - Math.log2(modz(z))) / iterations
  return {
    n: n,
    iterations: iterations,
    z: z,
  };
}

function sinz(z) {
  return {
    x: Math.sin(z.x) * Math.cosh(z.y),
    y: Math.cos(z.x) * Math.sinh(z.y),
  };
}

function cosz(z) {
  return {
    x: Math.cos(z.x) * Math.cosh(z.y),
    y: -Math.sin(z.x) * Math.sinh(z.y),
  };
}

function addz(z1, z2) {
  return {
    x: z1.x + z2.x,
    y: z1.y + z2.y,
  };
}

function mulz(z1, z2) {
  return {
    x: z1.x * z2.x - z1.y * z2.y,
    y: z1.x * z2.y + z1.y * z2.x,
  };
}

function divz(z1, z2) {
  const delimiter = modz(z2);
  return {
    x: (z1.x * z2.x + z1.y * z2.y) / delimiter,
    y: (z1.y * z2.x + z1.x * z2.y) / delimiter,
  };
}

function modz(z) {
  return z.x * z.x + z.y * z.y;
}
