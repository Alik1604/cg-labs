"use client";

import React, { useState } from "react";
import FractalCanvas from "../fractals/fractal_canvas";
import Slider from "../components/slider";
import Image from "next/image";
import { Dropdown } from "flowbite-react";

export default function Home() {
  const [scaleValue, setScaleValue] = useState(0);
  const [dxValue, setDx] = useState(0);
  const [dyValue, setDy] = useState(0);
  const [type, setType] = useState("geometrical");
  const [palette, setPalette] = useState(0);

  return (
    <main className="flex min-h-screen flex-row bg-white">
      <div className="flex min-h-screen w-[20%] flex-col p-6 justify-between">
        <div className="flex flex-col space-y-4">
          <button className="bg-white p-2  text-[#108A00] rounded-xl border border-[#108A00]">
            Student for student
          </button>
          <button className="bg-[#108A00] p-4 flex flex-row gap-3  rounded-xl border border-[#108A00] items-center">
            <Image src="/icons/fractal-1.svg" alt="" width={24} height={24} />
            <p className="text-white">Генератор фракталів</p>
          </button>
          <button className="bg-white p-4 flex flex-row gap-3 text-white rounded-xl border border-[#108A00] items-center">
            <Image src="/icons/image.svg" alt="" width={24} height={24} />
            <p className="text-black">Редактор картинок</p>
          </button>
          <button className="bg-white p-4 flex flex-row gap-3 text-white rounded-xl border border-[#108A00] items-center">
            <Image src="/icons/transform.svg" alt="" width={24} height={24} />
            <p className="text-black">Ручні зображення</p>
          </button>
          <button className="bg-white p-4 flex flex-row gap-3 text-white rounded-xl border border-[#108A00] items-center">
            <Image src="/icons/materials.svg" alt="" width={24} height={24} />
            <p className="text-black">Навчальні матеріали</p>
          </button>
        </div>

        <div className="mt-auto flex items-center">
          <Image
            src="/anna.png"
            alt=""
            width={48}
            height={32}
            className="rounded-[50%] h-[48px] w-[48px]"
          />
          <div className="ml-4">
            <p className="">Анна Гук</p>
            <p className="font-light">anna.guk@gmail.com</p>
          </div>
        </div>
      </div>

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
            <Dropdown.Item onClick={() => setType("a1")} >
              Типу z*sin(z) + c
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setType("a2")}>
              Типу c*ctg(z)
            </Dropdown.Item>
          </Dropdown>
          <br/>
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
