import React, { useEffect } from 'react';

const ContextMenu = ({ position, onDelete, trackId }) => {
  useEffect(() => {
    const handleClickOutside = () => {
      onDelete(null); // 关闭右键菜单
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onDelete]);

  return (
    <ul
      className="absolute bg-white border border-gray-200 rounded shadow-lg"
      style={{ top: position.y, left: position.x }}
    >
      <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
        onClick={() => onDelete(trackId)}
      >
        删除
      </li>
    </ul>
  );
};

export default ContextMenu;
