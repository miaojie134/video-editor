import React, { useState, useCallback, useRef } from 'react';
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import debounce from 'lodash/debounce';
import { Button } from './ui';

const Timeline = ({ onDrop }) => {
  const [zoom, setZoom] = useState(1);
  const [tracks, setTracks] = useState([]);
  const [duration, setDuration] = useState(0);
  const containerRef = useRef(null);

  const updateZoom = useCallback(
    debounce((newZoom) => {
      setZoom(newZoom);
    }, 100),
    []
  );

  const handleZoomIn = () => {
    updateZoom(Math.min(zoom + 0.05, 5));
  };

  const handleZoomOut = () => {
    updateZoom(Math.max(zoom - 0.05, 0.1));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData('application/json');
      if (!data) {
        throw new Error('No data found');
      }
      const parsedData = JSON.parse(data);
      addTrack(parsedData);
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  };

  const addTrack = (media) => {
    const newTrack = {
      id: tracks.length,
      type: media.type,
      src: media.src,
      duration: media.duration,
      position: 0,
    };
    setTracks([...tracks, newTrack]);
    setDuration(Math.max(duration, media.duration));
  };

  const renderTimelineMarkers = () => {
    const markers = [];
    const interval = calculateInterval(zoom, duration);

    for (let time = 0; time <= duration; time += interval) {
      markers.push(
        <div
          key={time}
          className="absolute border-l border-gray-500"
          style={{ left: `${(time / duration) * 100}%`, transform: `scaleX(${1 / zoom})`, transformOrigin: 'left' }}
        >
          {time % (interval * 2) === 0 && (
            <span className="text-xs text-gray-700">{formatTime(time)}</span>
          )}
        </div>
      );
    }
    return markers;
  };

  const calculateInterval = (zoom, duration) => {
    if (zoom < 0.3) return 3600; // 1 hour
    if (zoom < 0.6) return 600; // 10 minutes
    if (zoom < 1) return 300; // 5 minutes
    if (zoom < 2) return 60; // 1 minute
    if (zoom < 3) return 30; // 30 seconds
    if (zoom < 4) return 15; // 15 seconds
    return 5; // 5 seconds
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours > 0 ? `${hours}:` : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderTracks = () => {
    return tracks.map((track) => (
      <div
        key={track.id}
        className={`relative h-16 bg-${track.type === 'video' ? 'gray-300' : 'gray-400'} mb-2`}
        style={{ width: `${track.duration * zoom}px`, transformOrigin: 'left' }}
      >
        <div className="absolute top-0 left-0 h-full flex items-center justify-between px-2">
          <div className="text-gray-700">{track.type === 'video' ? 'Video' : 'Audio'} Track</div>
          <div className="text-gray-700">Duration: {formatTime(track.duration)}</div>
        </div>
        <div className="absolute top-0 left-0 h-full bg-blue-500" draggable>
          <img src={track.src} alt={`track-${track.id}`} className="w-full h-full object-cover" />
        </div>
      </div>
    ));
  };

  return (
    <div
      className="bg-gray-100 rounded-lg p-4 flex-1 overflow-hidden"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Timeline</h2>
        <div className="flex items-center gap-2">
          <Button onClick={handleZoomIn}>
            <FaSearchPlus className="h-5 w-5" />
          </Button>
          <Button onClick={handleZoomOut}>
            <FaSearchMinus className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="relative w-full overflow-x-auto custom-scrollbar" ref={containerRef}>
        <div className="relative" style={{ width: `${duration * zoom}px`, transformOrigin: 'left' }}>
          <div className="relative w-full h-8 bg-gray-200 mb-2">
            {renderTimelineMarkers()}
          </div>
          <div className="relative w-full">{renderTracks()}</div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
