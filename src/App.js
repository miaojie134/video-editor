import React, { useState } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import Timeline from './components/Timeline';
import MediaLibrary from './components/MediaLibrary';

function App() {
  const [videoSrc, setVideoSrc] = useState('');
  const [tracks, setTracks] = useState([]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  const handleDrop = (item) => {
    setTracks((prevTracks) => [...prevTracks, item]);
    if (item.type === 'video') {
      setVideoSrc(item.src);
    }
  };

  const handleRemoveFromLibrary = (item) => {
    setTracks((prevTracks) => prevTracks.filter(track => track.src !== item.src));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Video Editor" />
      <div className="flex flex-1 overflow-auto">
        <div className="flex flex-col h-full py-2 pl-2 w-1/4">
          <MediaLibrary onDragStart={handleDragStart} onRemove={handleRemoveFromLibrary} />
        </div>
        <div className="flex flex-col flex-1 h-full p-2 space-y-2 w-4/6">
          <div className="flex-1 h-1/2 w-1/2">
            <VideoPlayer src={videoSrc} />
          </div>
          <div className="flex-1 h-1/2">
            <Timeline onDrop={handleDrop} tracks={tracks} setTracks={setTracks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
