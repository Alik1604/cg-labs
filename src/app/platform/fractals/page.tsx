'use client'

import Slider from '@/components/slider';
import FractalCanvas from '@/fractals/fractal_canvas';
import React, { useState } from 'react';

export default function Home() {
  const [scaleValue, setScaleValue] = useState(0);
  const [dxValue, setDx] = useState(0);
  const [dyValue, setDy] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <text id="sometext">Fractal canvas</text>
      <FractalCanvas scale={scaleValue} dx={dxValue} dy={dyValue}/>
      <Slider min={1} max={10000} defaultValue={100} onSliderChange={(newValue: number) => {
        setScaleValue(newValue);
      }}/>
      <Slider min={-100} max={100} defaultValue={0} onSliderChange={(dxValue: number) => {
        setDx(dxValue);
      }}/>
      <Slider min={-100} max={100} defaultValue={0} onSliderChange={(dyValue: number) => {
        setDy(dyValue);
      }}/>
    </main>
  );
}
