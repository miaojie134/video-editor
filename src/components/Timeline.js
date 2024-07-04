import React, { useState, useCallback, useRef } from 'react';
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import debounce from 'lodash/debounce';
import { Button } from './ui';

const Timeline = ({ onDrop }) => {
  const [zoom, setZoom] = useState(0.2);  // 默认缩放级别设为0.3
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
    updateZoom(Math.min(zoom + 0.1, 5));
  };

  const handleZoomOut = () => {
    updateZoom(Math.max(zoom - 0.1, 0.1));
  };

  const handleZoomChange = (e) => {
    const newZoom = parseFloat(e.target.value);
    if (newZoom >= 0.1 && newZoom <= 5) {
      updateZoom(newZoom);
    }
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
          style={{ left: `${(time / duration) * 100}%` }}
        >
          {time % (interval * 2) === 0 && (
            <span className="text-sm text-gray-700" style={{ transform: `scale(${1 / zoom})`, transformOrigin: 'left' }}>
              {formatTime(time)}
            </span>
          )}
        </div>
      );
    }
    return markers;
  };

  const calculateInterval = (zoom, duration) => {
    if (zoom < 0.2) return 1800; // 1 hour
    if (zoom < 0.4) return 1800; // 30 minutes
    if (zoom < 0.6) return 600; // 10 minutes
    if (zoom < 1) return 300; // 5 minutes
    if (zoom < 1.5) return 60; // 1 minute
    if (zoom < 2) return 30; // 30 seconds
    if (zoom < 3) return 15; // 15 seconds
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
        className={`relative h-16 bg-${track.type === 'video' ? 'gray-300' : 'gray-400'} mb-2  bg-blue-500`}
        style={{ width: `${track.duration * zoom}px` }}
      >
        <div className="absolute top-0 left-0 h-full flex items-center justify-between px-2">
          <div className="text-gray-700">{track.type === 'video' ? 'Video' : 'Audio'} Track</div>
          <div className="text-gray-700">
            Duration: {formatTime(track.duration)}
          </div>
        </div>
        <div className="absolute top-0 left-0 h-full" draggable>
          <img src={track.src} alt={`track-${track.id}`} className="w-full h-full object-cover" />
        </div>
      </div>
    ));
  };

  return (
    <div
      className="bg-gray-100 rounded-lg p-4 flex-1 h-full"
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
          <input
            type="number"
            step="0.1"
            min="0.1"
            max="5"
            value={zoom}
            onChange={handleZoomChange}
            className="border rounded px-2 py-1 w-20"
          />
        </div>
      </div>
      <div className="relative w-full custom-scrollbar overflow-x-auto" ref={containerRef}>
        <div className="relative" style={{ width: `${duration * zoom}px` }}>
          <div className="relative w-full h-6 bg-gray-200 mb-2">
            {renderTimelineMarkers()}
          </div>
          <div>
            {renderTracks()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
