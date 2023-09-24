'use client'

import React, { useState } from 'react';
import FractalCanvas from "../fractals/fractal_canvas";
import Slider from "../components/slider"

export default function Home() {
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <text id="sometext">Fractal canvas</text>
      <FractalCanvas scale={sliderValue}/>
      <Slider onSliderChange={(newValue: number) => {
        setSliderValue(newValue);
        console.log("value changed to: " + newValue)
      }}/>
    </main>
  );
}
