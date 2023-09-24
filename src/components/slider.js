import React, { useEffect, useState } from 'react';

const Slider = ({ onSliderChange }) => {
  const defaultSliderValue = 100
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
    onSliderChange(newValue);
  };

  useEffect(() => {
    onSliderChange(defaultSliderValue)
  }, [])

  return (
    <div style ={{
      padding: 16
    }}>
      <input
        type="range"
        min={1}
        max={1000}
        value={sliderValue}
        onChange={handleSliderChange}
        style={{
          width: 600
        }}
      />
    </div>
  );
};

export default Slider;