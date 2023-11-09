"use client";
import Navigation from "@/components/navigation";
import Slider from "@/components/slider";
import React, { useState, useRef, useEffect } from "react";
import {
  addMouseListenerToCanvasHSV,
  addMouseListenerToCanvasRGB,
} from "@/images/mouselogic";
import { Pixel } from "@/images/utils/pixel";
import {
  getNewPixelsArray,
  drawPixelsArrayOnCanvas,
} from "@/images/utils/pixels_changer";

const maxCanvasWidth = 640;
const maxCanvasHeight = 360;

const Images: React.FC = () => {
  const [defaultImage, setDefaultImage] = useState<HTMLImageElement | null>(
    null
  );
  const [defaultPixelsArray, setDefaultPixelsArray] = useState<Array<Pixel>>();
  const [value, setValue] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [selectedArea, setSelectedArea] = useState<object>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = new Image();
      image.onload = () => {
        setDefaultImage(image);

        const canvas1 = canvasRef1.current;
        const canvas2 = canvasRef2.current;
        if (canvas1 && canvas2) {
          const ctx1 = canvas1.getContext("2d");
          const ctx2 = canvas2.getContext("2d");
          if (ctx1 && ctx2) {
            canvas1.width = image.width;
            canvas1.height = image.height;
            canvas2.width = image.width;
            canvas2.height = image.height;

            const widthCoef = image.width / maxCanvasWidth;
            const heightCoef = image.height / maxCanvasHeight;

            ctx1.scale(
              image.width / canvas1.width,
              image.height / canvas1.height
            );
            ctx2.scale(
              image.width / canvas2.width,
              image.height / canvas2.height
            );

            ctx1.drawImage(image, 0, 0);
            ctx2.drawImage(image, 0, 0);

            const pixelsArray = initializePixelArray(
              ctx1,
              canvas1.width,
              canvas1.height
            );

            setDefaultPixelsArray(pixelsArray);

            addMouseListenerToCanvasHSV(
              canvas1,
              textRef1,
              defaultPixelsArray,
              canvas1.width,
              widthCoef,
              heightCoef,
              image,
              setSelectedArea
            );

            addMouseListenerToCanvasRGB(
              canvas2,
              textRef2,
              defaultPixelsArray,
              canvas1.width,
              widthCoef,
              heightCoef
            );
          }
        }
      };

      image.src = URL.createObjectURL(event.target.files[0]);
    }
  };

  const initializePixelArray = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): Array<Pixel> => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const array: Array<Pixel> = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        array.push(
          new Pixel(
            data[index],
            data[index + 1],
            data[index + 2],
            data[index + 3]
          )
        );
      }
    }

    return array;
  };

  useEffect(() => {
    if (!defaultImage) return;
    const widthCoef = defaultImage.width / maxCanvasWidth;
    const heightCoef = defaultImage.height / maxCanvasHeight;

    addMouseListenerToCanvasHSV(
      canvasRef1.current,
      textRef1,
      defaultPixelsArray,
      canvasRef1.current?.width,
      widthCoef,
      heightCoef,
      defaultImage,
      setSelectedArea
    );

    addMouseListenerToCanvasRGB(
      canvasRef2.current,
      textRef2,
      defaultPixelsArray,
      canvasRef1.current?.width,
      widthCoef,
      heightCoef
    );
  }, [defaultPixelsArray]);

  useEffect(() => {
    if (canvasRef1.current && defaultImage) {
      drawPixelsArrayOnCanvas(
        canvasRef1.current,
        getNewPixelsArray(
          defaultPixelsArray,
          defaultImage?.width,
          defaultImage?.height,
          selectedArea,
          value,
          saturation
        ),
        defaultImage?.width,
        defaultImage?.height
      );
    }
  }, [value, saturation]);

  useEffect(() => {
    // const canvas = canvasRef1.current;
    // if (canvas) {
    //   const ctx = canvas.getContext("2d");
    //   if (ctx && defaultImage) {
    //     ctx.drawImage(defaultImage, 0, 0);
    //   }
    // }
  }, [selectedArea]);

  return (
    <main className="flex min-h-screen flex-row bg-white">
      <Navigation />

      <div
        className="flex-grow p-12"
        style={{
          color: "black",
        }}
      >
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <br />
        <br />
        <div>
          <p>Saturation: {saturation}</p>
          <Slider
            min={0}
            max={100}
            defaultValue={saturation}
            onSliderChange={(newValue: number) => setSaturation(newValue)}
          />
        </div>
        <div>
          <p>Value: {value}</p>
          <Slider
            min={0}
            max={100}
            defaultValue={value}
            onSliderChange={(newValue: number) => setValue(newValue)}
          />
        </div>
        <div className="flex justify-between my-4">
          <div>
            <canvas
              style={{
                maxWidth: maxCanvasWidth,
                maxHeight: maxCanvasHeight,
              }}
              className="bg-white border"
              ref={canvasRef1}
            />
            <p ref={textRef1}></p>
          </div>
          <div>
            <canvas
              style={{
                maxWidth: maxCanvasWidth,
                maxHeight: maxCanvasHeight,
              }}
              className="bg-white border"
              ref={canvasRef2}
            />
            <p ref={textRef2}></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Images;
