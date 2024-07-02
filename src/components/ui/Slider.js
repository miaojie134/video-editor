// src/components/ui/Slider.js
const Slider = ({ id, defaultValue }) => {
  return (
    <input
      type="range"
      id={id}
      defaultValue={defaultValue}
      className="h-1 w-full rounded-full bg-muted-foreground [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-0 [&:focus-visible]:ring-0 [&:focus-visible]:ring-offset-0 [&:focus-visible]:scale-105 [&:focus-visible]:transition-transform"
    />
  );
};

export default Slider;
