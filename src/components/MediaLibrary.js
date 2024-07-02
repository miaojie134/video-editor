// src/components/MediaLibrary.js
import React from 'react';

const MediaLibrary = ({ mediaItems }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 h-full overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Media Library</h2>
      <div className="grid grid-cols-2 gap-4">
        {mediaItems.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-lg shadow">
            {item.type === 'video' ? (
              <video className="w-full h-auto" controls>
                <source src={item.src} type="video/mp4" />
              </video>
            ) : (
              <img className="w-full h-auto" src={item.src} alt={item.name} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
