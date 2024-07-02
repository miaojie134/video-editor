// src/App.js
import React from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import Timeline from './components/Timeline';
import EditingTools from './components/EditingTools';
import MediaLibrary from './components/MediaLibrary';

function App() {
  const tools = [
    { id: 'brightness', label: 'Brightness', defaultValue: 50 },
    { id: 'contrast', label: 'Contrast', defaultValue: 50 },
    // Add other tools as needed
  ];

  const timelineItems = new Array(5).fill(null);

  const mediaItems = [
    { type: 'video', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', name: 'Sample Video' },
    { type: 'image', src: 'https://via.placeholder.com/150', name: 'Sample Image' },
    // Add more media items as needed
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header title="Video Editor" />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-1/6 h-full py-2 pl-2">
          <MediaLibrary mediaItems={mediaItems} />
        </div>
        <div className="flex flex-col flex-1  space-y-2 h-full p-2">
          <VideoPlayer src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
          <Timeline items={timelineItems} />
        </div>
        <div className="flex flex-col w-1/6 h-full py-2 pr-2">
          <EditingTools tools={tools} />
        </div>
      </div>
    </div>
  );
}

export default App;
