"use client";

import React, { useState } from "react";
import FractalCanvas from "../fractals/fractal_canvas";
import Slider from "../components/slider";
import { Dropdown } from "flowbite-react";
import Navigation from "@/components/navigation";

export default function Home() {
  const [scaleValue, setScaleValue] = useState(0);
  const [dxValue, setDx] = useState(0);
  const [dyValue, setDy] = useState(0);
  const [type, setType] = useState("g");
  const [palette, setPalette] = useState(0);

  return (
    <main className="flex min-h-screen flex-row bg-white">
      <Navigation/>

      <div className="flex min-h-screen w-[80%] bg-[#108A000D] justify-center items-center p-12">
        <div className=" w-[80%] h-[100%] items-center justify-center flex">
          <FractalCanvas
            scale={scaleValue}
            dx={dxValue}
            dy={dyValue}
            type={type}
            palette={palette}
          />
        </div>
        <div className="ml-12">
          <Dropdown label="Оберіть тип фракталу">
            <Dropdown.Item onClick={() => setType("g")}>
              Крижаний трикутний
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setType("a1")}>
              Типу z*sin(z) + c
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setType("a2")}>
              Типу c*ctg(z)
            </Dropdown.Item>
          </Dropdown>
          <br />
          <Dropdown label="Оберіть палітру">
            <Dropdown.Item onClick={() => setPalette(0)}>
              Синя глазурь
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setPalette(1)}>
              Квітковий сад
            </Dropdown.Item>
          </Dropdown>

          <Slider
            min={1}
            max={10000}
            defaultValue={100}
            onSliderChange={(newValue: number) => {
              setScaleValue(newValue);
            }}
          />
          <Slider
            min={-100}
            max={100}
            defaultValue={0}
            onSliderChange={(dxValue: number) => {
              setDx(dxValue);
            }}
          />
          <Slider
            min={-100}
            max={100}
            defaultValue={0}
            onSliderChange={(dyValue: number) => {
              setDy(dyValue);
            }}
          />
        </div>
      </div>
    </main>
  );
}
