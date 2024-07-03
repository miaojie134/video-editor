import React, { useState, useEffect, useCallback } from 'react';
import { FaTrashAlt, FaFileUpload } from 'react-icons/fa';
import { formatFileSize, formatDuration } from '../utils';

const MediaLibrary = ({ onDragStart }) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const existingFileNames = items.map(item => item.name);
    const newItems = files
      .filter(file => !existingFileNames.includes(file.name))
      .map(file => ({
        type: file.type.startsWith('video') ? 'video' : 'image',
        src: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        dimensions: file.type.startsWith('image') ? { width: null, height: null } : null,
        duration: file.type.startsWith('video') ? null : null,
        poster: '',
      }));
    setItems([...items, ...newItems]);
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleMetadata = useCallback((index, metadata, poster) => {
    const newItems = [...items];
    if (newItems[index].type === 'video') {
      newItems[index].duration = metadata.duration;
      newItems[index].dimensions = {
        width: metadata.width,
        height: metadata.height,
      };
      newItems[index].poster = poster;
    } else if (newItems[index].type === 'image') {
      newItems[index].dimensions = {
        width: metadata.width,
        height: metadata.height,
      };
    }
    setItems(newItems);
  }, [items]);

  const generateVideoPoster = (videoSrc, callback) => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.crossOrigin = "anonymous";
    video.addEventListener('loadeddata', () => {
      video.currentTime = 1;
    });
    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL();
      callback(dataURL, { width: video.videoWidth, height: video.videoHeight, duration: video.duration });
    });
  };

  useEffect(() => {
    items.forEach((item, index) => {
      if (item.type === 'video' && !item.poster) {
        generateVideoPoster(item.src, (poster, metadata) => {
          handleMetadata(index, metadata, poster);
        });
      }
    });
  }, [items, handleMetadata]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">媒体库</h2>
        <label className="cursor-pointer">
          <FaFileUpload className="text-xl " />
          <input
            type="file"
            accept="video/*,image/*"
            onChange={handleFileUpload}
            multiple
            className="hidden"
          />
        </label>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
        <ul className="mt-4">
          {currentItems.map((item, index) => (
            <li
              key={indexOfFirstItem + index}
              className="bg-white p-2 rounded-lg shadow mb-2 flex justify-between items-center max-w-full"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify(item));
                if (onDragStart) onDragStart(e, item);
              }}
            >
              {item.type === 'video' ? (
                <img
                  className="w-24 h-auto mr-4"
                  src={item.poster}
                  alt={item.name}
                />
              ) : (
                <img
                  className="w-24 h-auto mr-4"
                  src={item.src}
                  onLoad={(e) => handleMetadata(indexOfFirstItem + index, { width: e.target.naturalWidth, height: e.target.naturalHeight })}
                  alt={item.name}
                />
              )}
              <div className="flex-1 overflow-hidden text-xs">
                <p className="font-semibold truncate">{item.name}</p>
                {item.type === 'video' && item.duration && <p className="truncate">时长: {formatDuration(item.duration)}</p>}
                {item.type === 'video' && item.dimensions && (
                  <p className="truncate">分辨率: {item.dimensions.width}x{item.dimensions.height}</p>
                )}
                {item.type === 'image' && item.dimensions && (
                  <p className="truncate">分辨率: {item.dimensions.width}x{item.dimensions.height}</p>
                )}
                <p className="truncate">大小: {formatFileSize(item.size)}</p>
              </div>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => handleRemove(indexOfFirstItem + index)}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-2 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white border'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
