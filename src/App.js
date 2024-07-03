import React, { useState } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import Timeline from './components/Timeline';
import EditingTools from './components/EditingTools';
import MediaLibrary from './components/MediaLibrary';

function App() {
  const [videoSrc, setVideoSrc] = useState('');

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('video', JSON.stringify(item));
  };

  const handleDrop = (item) => {
    if (item.type === 'video') {
      setVideoSrc(item.src);
    }
  };

  const tools = [
    { id: 'brightness', label: 'Brightness', defaultValue: 50 },
    { id: 'contrast', label: 'Contrast', defaultValue: 50 },
    // 添加其他工具
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header title="Video Editor" />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-1/6 h-full py-2 pl-2">
          <MediaLibrary onDragStart={handleDragStart} />
        </div>
        <div className="flex flex-col flex-1 space-y-2 h-full p-2">
          <VideoPlayer src={videoSrc} />
          <Timeline onDrop={handleDrop} />
        </div>
        <div className="flex flex-col w-1/6 h-full py-2 pr-2">
          <EditingTools tools={tools} />
        </div>
      </div>
    </div>
  );
}

export default App;
