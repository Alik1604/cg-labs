"use client";
import Navigation from "@/components/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { drawCanvas } from "@/figures/system_canvas_logic";
import { drawTriangle } from "@/figures/triangle_canvas_logic";
import { Point } from "@/fractals/implementations/utils/point";
import { getNewTriangle } from "@/figures/Matrix";
import ChatComponent from "@/components/chat";

const AffineTransformations = () => {
  const canvasSize = {
    width: 720,
    height: 540,
  };

  const framesPerSecond = 10;
  const delayRef = useRef(0);
  const animationStarted = useRef(false);

  const [animationStartedForUi, setAnimationStartedForUi] = useState(false);
  const [systemInputs, setSystemInputs] = useState({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  });
  const [triangleInputs, setTriangleInputs] = useState({
    ax: 1,
    ay: -1,
    bx: 2,
    by: 2,
    cx: 3,
    cy: -3,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  });
  const [canvasConfigs, setCanvasConfigs] = useState({
    originX: 0,
    originY: 0,
    oneLengthX: 0,
    oneLengthY: 0,
  });
  const [trianglePoints, setTrianglePoints] = useState({
    a: new Point(0, 0),
    b: new Point(0, 0),
    c: new Point(0, 0),
  });

  const canvasRef = useRef(null);

  const handleSystemInputChange = (event: any) => {
    // if (!event.target.value || event.target.value === "") return;

    setSystemInputs({
      ...systemInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleTriangleInputChange = (event: any) => {
    // let value = event.target.value
    //
    // if (event.target.name === "mirrorX") {
    //     setTriangleInputs({...triangleInputs, ["mirrorX"]: !triangleInputs.mirrorX});
    // } else if (event.target.name === "mirrorY") {
    //     setTriangleInputs({...triangleInputs, ["mirrorY"]: !triangleInputs.mirrorY});
    // } else {
    //     setTriangleInputs({...triangleInputs, [event.target.name]: value});
    // }

    const newTriangleInputs = {
      ...triangleInputs,
      [event.target.name]: event.target.value,
    };

    setTrianglePoints({
      a: new Point(newTriangleInputs.ax, newTriangleInputs.ay),
      b: new Point(newTriangleInputs.bx, newTriangleInputs.by),
      c: new Point(newTriangleInputs.cx, newTriangleInputs.cy),
    });
    setTriangleInputs(newTriangleInputs);
  };

  const startAnimation = () => {
    animationStarted.current = true;
    setAnimationStartedForUi(true);

    let newTrianglePoints:
      | React.SetStateAction<{ a: Point; b: Point; c: Point }>
      | undefined;
    let newCanvasConfigs:
      | React.SetStateAction<{
          originX: number;
          originY: number;
          oneLengthX: number;
          oneLengthY: number;
        }>
      | undefined;
    let i = 1;
    let isMirrored = false;

    const animateTriangle = () => {
      if (!animationStarted.current) return;

      if (delayRef.current > 0) {
        delayRef.current--;
        requestAnimationFrame(animateTriangle);
      } else {
        newTrianglePoints =
          newTrianglePoints === undefined
            ? getNewTriangle(
                trianglePoints,
                triangleInputs.x,
                triangleInputs.y,
                triangleInputs.scaleX,
                triangleInputs.scaleY,
                isMirrored
              )
            : getNewTriangle(
                newTrianglePoints,
                triangleInputs.x,
                triangleInputs.y,
                triangleInputs.scaleX,
                triangleInputs.scaleY,
                isMirrored
              );
        if (newTrianglePoints) setTrianglePoints(newTrianglePoints);

        isMirrored = !isMirrored;

        newCanvasConfigs = drawCanvas(canvasRef, systemInputs);
        if (newCanvasConfigs) setCanvasConfigs(newCanvasConfigs);

        console.log(
          newTrianglePoints.a,
          newTrianglePoints.b,
          newTrianglePoints.c
        );

        if (newCanvasConfigs) {
          if (newTrianglePoints) {
            drawTriangle(canvasRef, newCanvasConfigs, newTrianglePoints);
          } else {
            drawTriangle(canvasRef, newCanvasConfigs, trianglePoints);
          }
        } else {
          if (newTrianglePoints) {
            drawTriangle(canvasRef, canvasConfigs, newTrianglePoints);
          } else {
            drawTriangle(canvasRef, canvasConfigs, trianglePoints);
          }
        }

        console.log(i++);

        delayRef.current = framesPerSecond;
        requestAnimationFrame(animateTriangle);
      }
    };

    animateTriangle();
  };

  const stopAnimation = () => {
    animationStarted.current = false;
    setAnimationStartedForUi(false);
  };

  useEffect(() => {
    const drawResult = drawCanvas(canvasRef, systemInputs);
    if (drawResult) setCanvasConfigs(drawResult);
    drawResult
      ? drawTriangle(canvasRef, drawResult, trianglePoints)
      : drawTriangle(canvasRef, canvasConfigs, trianglePoints);

    window.addEventListener("resize", () => {
      const drawResult = drawCanvas(canvasRef, systemInputs);
      if (drawResult) setCanvasConfigs(drawResult);
      drawResult
        ? drawTriangle(canvasRef, drawResult, trianglePoints)
        : drawTriangle(canvasRef, canvasConfigs, trianglePoints);
    });

    return () => {
      window.removeEventListener("resize", () => {
        const drawResult = drawCanvas(canvasRef, systemInputs);
        if (drawResult) setCanvasConfigs(drawResult);
        drawResult
          ? drawTriangle(canvasRef, drawResult, trianglePoints)
          : drawTriangle(canvasRef, canvasConfigs, trianglePoints);
      });
    };
  }, [
    systemInputs.x,
    systemInputs.y,
    systemInputs.scaleX,
    systemInputs.scaleY,
  ]);

  useEffect(() => {
    if (animationStarted.current) return;

    drawCanvas(canvasRef, systemInputs);
    drawTriangle(canvasRef, canvasConfigs, trianglePoints);

    window.addEventListener("resize", () => {
      drawCanvas(canvasRef, systemInputs);
      drawTriangle(canvasRef, canvasConfigs, trianglePoints);
    });

    return () => {
      window.removeEventListener("resize", () => {
        drawCanvas(canvasRef, systemInputs);
        drawTriangle(canvasRef, canvasConfigs, trianglePoints);
      });
    };
  }, [
    trianglePoints.a,
    trianglePoints.b,
    trianglePoints.c,
    animationStarted.current,
    // triangleInputs.x,
    // triangleInputs.y,
    // triangleInputs.scaleX,
    // triangleInputs.scaleY,
    // triangleInputs.mirrorX,
    // triangleInputs.mirrorY
  ]);

  // @ts-ignore
  return (
    <main className="flex max-h-screen flex-row bg-white">
      <Navigation />
      <ChatComponent />
      <div className="flex flex-row flex-grow p-12 bg-[#108A00] bg-opacity-5 overflow-auto">
        <div className="space-y-4 text-black border p-3 w-1/3">
          <div className="text-black font-bold">
            Налаштування системи координат
          </div>
          <div className="block">
            <div>
              <Label htmlFor="displacementX">Зміщення по X</Label>
              <TextInput
                id="x"
                type="number"
                name="x"
                onChange={handleSystemInputChange}
                value={systemInputs.x}
                placeholder={"Будь-яке число"}
                disabled={animationStartedForUi}
              />
            </div>
            <div>
              <Label htmlFor="displacementY">Зміщення по Y</Label>
              <TextInput
                id="y"
                type="number"
                name="y"
                onChange={handleSystemInputChange}
                value={systemInputs.y}
                placeholder={"Будь-яке число"}
                disabled={animationStartedForUi}
              />
            </div>
          </div>
          <div className="block">
            <div>
              <Label htmlFor="scaleX">Збільшення масштабу по X</Label>
              <TextInput
                id="scaleX"
                type="number"
                min="0.1"
                max="10"
                step="0.1"
                name="scaleX"
                onChange={handleSystemInputChange}
                value={systemInputs.scaleX}
                placeholder={"Від 0.1 до 10"}
                disabled={animationStartedForUi}
              />
            </div>
            <div>
              <Label htmlFor="scaleY">Збільшення масштабу по Y</Label>
              <TextInput
                id="scaleY"
                type="number"
                min="0.1"
                max="10"
                step="0.1"
                name="scaleY"
                onChange={handleSystemInputChange}
                value={systemInputs.scaleY}
                placeholder={"Від 0.1 до 10"}
                disabled={animationStartedForUi}
              />
            </div>
          </div>
        </div>
        <div className="flex-grow mt-4 p-4">
          <canvas
            className="border"
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
          />
          <br />
          <div className="flex gap-4">
            <Button>Зберегти</Button>
          </div>
        </div>
        <div className="space-y-4 text-black border p-3">
          <div className="text-black font-bold">Налаштування трикутника</div>
          <div className="block grid-cols-3 gap-4 w-[200px]">
            <div key={"A"}>
              <Label htmlFor={`ax`}>{"A"}</Label>
              <div className="flex gap-2">
                <TextInput
                  id={`ax`}
                  type="number"
                  name={`ax`}
                  onChange={handleTriangleInputChange}
                  placeholder={"X"}
                  value={triangleInputs.ax}
                  disabled={animationStartedForUi}
                />
                <TextInput
                  id={`ay`}
                  type="number"
                  name={`ay`}
                  onChange={handleTriangleInputChange}
                  placeholder={"Y"}
                  value={triangleInputs.ay}
                  disabled={animationStartedForUi}
                />
              </div>
            </div>
            <div key={"B"}>
              <Label htmlFor={`ax`}>{"B"}</Label>
              <div className="flex gap-2">
                <TextInput
                  id={`bx`}
                  type="number"
                  name={`bx`}
                  onChange={handleTriangleInputChange}
                  placeholder={"X"}
                  value={triangleInputs.bx}
                  disabled={animationStartedForUi}
                />
                <TextInput
                  id={`by`}
                  type="number"
                  name={`by`}
                  onChange={handleTriangleInputChange}
                  placeholder={"Y"}
                  value={triangleInputs.by}
                  disabled={animationStartedForUi}
                />
              </div>
            </div>
            <div key={"C"}>
              <Label htmlFor={`ax`}>{"C"}</Label>
              <div className="flex gap-2">
                <TextInput
                  id={`cx`}
                  type="number"
                  name={`cx`}
                  onChange={handleTriangleInputChange}
                  placeholder={"X"}
                  value={triangleInputs.cx}
                  disabled={animationStartedForUi}
                />
                <TextInput
                  id={`cy`}
                  type="number"
                  name={`cy`}
                  onChange={handleTriangleInputChange}
                  placeholder={"Y"}
                  value={triangleInputs.cy}
                  disabled={animationStartedForUi}
                />
              </div>
            </div>
          </div>
          <div className="block">
            <div>
              <Label htmlFor="displacementX">Зміщення по X</Label>
              <TextInput
                id="x"
                type="number"
                name="x"
                onChange={handleTriangleInputChange}
                value={triangleInputs.x}
                placeholder={"Будь-яке число"}
                disabled={animationStartedForUi}
              />
            </div>
            <div>
              <Label htmlFor="displacementY">Зміщення по Y</Label>
              <TextInput
                id="y"
                type="number"
                name="y"
                onChange={handleTriangleInputChange}
                value={triangleInputs.y}
                placeholder={"Будь-яке число"}
                disabled={animationStartedForUi}
              />
            </div>
          </div>
          <div className="block">
            <div>
              <Label htmlFor="scaleX">Збільшення масштабу по X</Label>
              <TextInput
                id="scaleX"
                type="number"
                min="0.01"
                step="0.01"
                name="scaleX"
                onChange={handleTriangleInputChange}
                value={triangleInputs.scaleX}
                placeholder={"Будь-яке число від 0.01"}
                disabled={animationStartedForUi}
              />
            </div>
            <div>
              <Label htmlFor="scaleY">Збільшення масштабу по Y</Label>
              <TextInput
                id="scaleY"
                type="number"
                min="0.01"
                step="0.01"
                name="scaleY"
                onChange={handleTriangleInputChange}
                value={triangleInputs.scaleY}
                placeholder={"Будь-яке число від 0.01"}
                disabled={animationStartedForUi}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={animationStartedForUi ? stopAnimation : startAnimation}
            >
              {animationStartedForUi ? "Зупинити рух" : "Почати рух"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AffineTransformations;
