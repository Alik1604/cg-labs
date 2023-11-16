import { Pixel } from "@/images/utils/pixel";

let isDragging = false;
let startX, startY, endX, endY;

function getMousePos(canvas, event) {
  const rect = canvas.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x, y };
}

export function addMouseListenerToCanvasHSV(
  canvasRef,
  textRef,
  pixelsArray,
  width,
  widthCoef,
  heightCoef,
  defaultImage,
  setSelectedArea
) {
  canvasRef.addEventListener("mousedown", (event) => {
    isDragging = true;

    const mousePos = getMousePos(canvasRef, event);

    startX = parseInt(mousePos.x * widthCoef);
    startY = parseInt(mousePos.y * heightCoef);
  });

  canvasRef.addEventListener("mouseup", () => {
    isDragging = false;
  });

  canvasRef.addEventListener("mousemove", (event) => {
    const mousePos = getMousePos(canvasRef, event);

    const x = parseInt(mousePos.x);
    const y = parseInt(mousePos.y);

    if (isDragging) {
      endX = x;
      endY = y;

      const selectedArea = {
        x: Math.min(startX, endX),
        y: Math.min(startY, endY),
        width: Math.abs((startX - endX) * heightCoef),
        height: Math.abs((startY - endY) * heightCoef),
      };
      setSelectedArea(selectedArea);

      const ctx = canvasRef.getContext("2d");

      ctx.drawImage(defaultImage, 0, 0);
      ctx.strokeRect(
        selectedArea.x,
        selectedArea.y,
        selectedArea.width,
        selectedArea.height
      );
    }

    if (pixelsArray) {
      const rgbPixel = pixelsArray[y * width + x];
      if (!rgbPixel) return;

      const pixel = rgbPixel.asHSV();

      textRef.current.innerHTML =
        "H: " +
        parseInt(pixel.h) +
        " S: " +
        parseInt(pixel.s) +
        " V: " +
        parseInt(pixel.v);
    }
  });

  canvasRef.addEventListener("mouseout", () => {
    textRef.current.innerHTML = "H: _ S: _ V: _";
  });
}

export function addMouseListenerToCanvasRGB(
  canvasRef,
  textRef,
  pixelsArray,
  width,
  widthCoef,
  heightCoef
) {
  canvasRef.addEventListener("mousemove", (event) => {
    if (!pixelsArray) return;

    const mousePos = getMousePos(canvasRef, event);
    const x = parseInt(mousePos.x * widthCoef);
    const y = parseInt(mousePos.y * heightCoef);

    const pixel = pixelsArray[x + y * width];

    textRef.current.innerHTML =
      "R: " + pixel.r + " G: " + pixel.g + " B: " + pixel.b;
  });

  canvasRef.addEventListener("mouseout", () => {
    textRef.current.innerHTML = "R: _ G: _ B: _";
  });
}
