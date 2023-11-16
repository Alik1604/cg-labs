import { Pixel } from "./pixel";

export function getNewPixelsArray(
  defaultPixelsArray,
  width,
  height,
  selectedArea,
  value,
  saturation
) {
  const pixelsArrayCopy = [...defaultPixelsArray];

  for (let y = selectedArea.y; y < selectedArea.y + selectedArea.height; y++) {
    for (let x = selectedArea.x; x < selectedArea.x + selectedArea.width; x++) {
      const position = y * width + x;
      const rgbPixel = pixelsArrayCopy[position];
      if (!rgbPixel) continue;

      const pixel = rgbPixel.asHSV();

      if (pixel.h > 330 || pixel.h < 30) {
        pixel.s *= saturation / 100;
        pixel.v *= value / 100;
      }

      pixelsArrayCopy[position] = Pixel.fromHSV(pixel);
    }
  }

  return pixelsArrayCopy;
}

export function drawPixelsArrayOnCanvas(canvasRef, pixelsArray, width, height) {
  const ctx = canvasRef.getContext("2d");
  const imageData = ctx.getImageData(0, 0, width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const index = i * 4;

      imageData.data[index] = pixelsArray[i].r;
      imageData.data[index + 1] = pixelsArray[i].g;
      imageData.data[index + 2] = pixelsArray[i].b;
      imageData.data[index + 3] = pixelsArray[i].a;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
