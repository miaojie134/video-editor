import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ src, brightness, contrast }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    }
  }, [brightness, contrast]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full"
        src={src}
        controls
      />
    </div>
  );
};

export default VideoPlayer;
