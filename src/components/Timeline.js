import { Button } from './ui';
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";

const Timeline = ({ items }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 flex-1 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Timeline</h2>
        <div className="flex items-center gap-2">
          <Button><FaSearchPlus className="h-5 w-5" /></Button>
          <Button><FaSearchMinus className="h-5 w-5" /></Button>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 rounded-lg bg-white p-2 shadow">
            <div className="h-16 w-40 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
