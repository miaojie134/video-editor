/**
 * 格式化文件大小为更直观的单位
 * @param {number} size - 文件大小（以字节为单位）
 * @returns {string} 格式化后的文件大小
 */
export const formatFileSize = (size) => {
  const i = Math.floor(Math.log(size) / Math.log(1000));
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  return `${(size / Math.pow(1000, i)).toFixed(1)} ${units[i]}`;
};

/**
 * 格式化持续时间为 "HH:mm:ss" 格式
 * @param {number} duration - 持续时间，以秒为单位
 * @returns {string} 格式化后的持续时间
 */
export const formatDuration = (duration) => {
  const hrs = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const secs = Math.floor(duration % 60);
  return [
    hrs > 0 ? String(hrs).padStart(2, '0') : null,
    String(mins).padStart(2, '0'),
    String(secs).padStart(2, '0')
  ].filter(Boolean).join(':');
};