"use client";
import Navigation from "@/components/navigation";
import Slider from "@/components/slider";
import React, { useState, useRef } from "react";

// Типи для станів, які будуть використовуватися для HSV і RGB значень
type PixelArray = number[][][];

const Images: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [pixelArray, setPixelArray] = useState<PixelArray | null>(null);
  const [hue, setHue] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(0);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const img = new Image();
      img.onload = () => {
        setImage(img);

        const canvas = canvasRef1.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Тут можна додати логіку для перетворення зображення в 2D масив пікселів
            setPixelArray(initializePixelArray(ctx, img.width, img.height));
          }
        }
      };
      img.src = URL.createObjectURL(event.target.files[0]);
    }
  };

  // функція initializePixelArray, яка зчитує пікселі з канвасу
  const initializePixelArray = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): PixelArray => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const array: PixelArray = [];

    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        row.push([
          data[index],
          data[index + 1],
          data[index + 2],
          data[index + 3],
        ]); // RGB and Alpha
      }
      array.push(row);
    }

    return array;
  };

  return (
    <main className="flex min-h-screen flex-row bg-white">
      <Navigation />

      <div className="flex-grow p-12">
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <Slider
          min={0}
          max={360}
          defaultValue={hue}
          onSliderChange={(newValue: number) => setHue(newValue)}
        />
        <Slider
          min={0}
          max={100}
          defaultValue={saturation}
          onSliderChange={(newValue: number) => setSaturation(newValue)}
        />

        <div className="flex justify-between my-4">
          <div>
            <canvas
              className="max-w-xl max-h-xl bg-white border"
              ref={canvasRef1}
            />
            <p>HSV: {`H:${hue} S:${saturation} V:...`}</p>
          </div>
          <div>
            <canvas ref={canvasRef2} className="bg-white border" />
            <p>RGB: {`R:... G:... B:...`}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Images;
