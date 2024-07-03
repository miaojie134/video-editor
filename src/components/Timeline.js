
import { useState } from 'react';
import { Button } from './ui';
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa';

const Timeline = ({ onDrop }) => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
  };

  return (
    <div
      className="bg-gray-100 rounded-lg p-4 flex-1 overflow-hidden"
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('video');
        onDrop(JSON.parse(data));
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Timeline</h2>
        <div className="flex items-center gap-2">
          <Button onClick={handleZoomIn}><FaSearchPlus className="h-5 w-5" /></Button>
          <Button onClick={handleZoomOut}><FaSearchMinus className="h-5 w-5" /></Button>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto" style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}>
        {/* 这里可以放置帧 */}
        {/* {frames.map((frame, index) => (
          <div key={index} className="flex-shrink-0 rounded-lg bg-white p-2 shadow">
            {frame.image ? (
              <img src={frame.image} alt={`frame-${index}`} className="h-16 w-40 rounded-lg" />
            ) : (
              <div className="h-16 w-40 bg-gray-200 rounded-lg" />
            )}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Timeline;

