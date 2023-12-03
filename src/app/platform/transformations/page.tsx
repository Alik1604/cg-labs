"use client";
import Navigation from "@/components/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Label, TextInput, Button } from "flowbite-react";

const AffineTransformations = () => {
  const [inputs, setInputs] = useState({
    ax: -5,
    ay: -5,
    bx: -5,
    by: 5,
    cx: 5,
    cy: 10,
    dx: 10,
    dy: -5,
    a: 10,
    b: 20,
    scale: 1,
  });

  const canvasRef = useRef(null);

  const handleInputChange = (event: any) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current as any;
    if (canvas === null) return;

    // Make sure the canvas size is set correctly in the DOM
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Determine the origin
    const originX = width / 2;
    const originY = height / 2;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    const gridSize = 10; // Define the size of the grid cells
    ctx.beginPath();
    for (let x = 0; x <= width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.strokeStyle = "#b8daba"; // Light green color
    ctx.stroke();

    // Draw axes
    ctx.beginPath();
    // x-axis
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    // y-axis
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.strokeStyle = "#000000"; // Black color for axes
    ctx.stroke();

    // Add labels on the x-axis
    ctx.fillStyle = "#000000"; // Black color for text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"; // Text alignment for x-axis labels

    // Labeling the x-axis
    for (let x = 0; x <= width; x += gridSize * 10) {
      // Skip the origin to avoid clutter
      if (x !== originX) {
        const label = (x - originX) / gridSize;
        ctx.fillText(label.toString(), x, originY + 5);
      }
    }

    // Labeling the y-axis (optional, add this if you need y-axis labeling)
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let y = 0; y <= height; y += gridSize * 10) {
      // Skip the origin to avoid clutter
      if (y !== originY) {
        const label = (originY - y) / gridSize;
        ctx.fillText(label.toString(), originX - 5, y);
      }
    }
  };

  useEffect(() => {
    drawCanvas();
    // Add a resize event listener if you want to redraw the canvas when the window is resized
    window.addEventListener("resize", drawCanvas);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", drawCanvas);
    };
  }, []);

  return (
    <main className="flex max-h-screen flex-row bg-white">
      <Navigation />
      <div className="flex flex-col flex-grow p-12 bg-[#108A00] bg-opacity-5 overflow-auto">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {["A", "B", "C"].map((vertex) => (
              <div key={vertex}>
                <Label htmlFor={`${vertex.toLowerCase()}x`}>{vertex}</Label>
                <div className="flex gap-2">
                  <TextInput
                    id={`${vertex.toLowerCase()}x`}
                    type="number"
                    name={`${vertex.toLowerCase()}x`}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    id={`${vertex.toLowerCase()}y`}
                    type="number"
                    name={`${vertex.toLowerCase()}y`}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <Label htmlFor="displacementX">Зміщення по X</Label>
            <TextInput
              id="a"
              type="number"
              name="a"
              onChange={handleInputChange}
              value={inputs.a}
            />
          </div>
          <div>
            <Label htmlFor="displacementY">Зміщення по Y</Label>
            <TextInput
              id="b"
              type="number"
              name="b"
              onChange={handleInputChange}
              value={inputs.b}
            />
          </div>
          <div>
            <Label htmlFor="scale">Збільшення масштабу (1-10)</Label>
            <TextInput
              id="scale"
              type="number"
              name="scale"
              onChange={handleInputChange}
              value={inputs.scale}
            />
          </div>
          <div className="flex gap-4">
            <Button className="bg-[#108A00] text-white hover:text-black hover:border hover:border-black hover:bg-white">
              Показати
            </Button>
            <Button>Зберегти</Button>
          </div>
        </div>
        <div className="flex-grow mt-4">
          <canvas ref={canvasRef} height={500} width={1100} />
        </div>
      </div>
    </main>
  );
};

export default AffineTransformations;
