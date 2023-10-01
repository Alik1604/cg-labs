import React, { useEffect, useState } from 'react';

const Slider = ({ min, max, defaultValue, onSliderChange }) => {
  const defaultSliderValue = defaultValue
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
        min={min}
        max={max}
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