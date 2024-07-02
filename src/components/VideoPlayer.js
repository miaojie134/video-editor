// src/components/VideoPlayer.js
const VideoPlayer = ({ src }) => {
  return (
    <div className="relative w-full h-1/2" style={{ paddingTop: '56.25%' }}>
      <video
        className="absolute top-0 left-0 w-full h-full"
        src={src}
        controls
      />
    </div>
  );
};

export default VideoPlayer;
