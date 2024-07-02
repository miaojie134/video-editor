import { Button, Label, Slider } from './ui';
import { IoExpand } from 'react-icons/io5';

const EditingTools = ({ tools }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 h-full overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Editing Tools</h2>
        <Button><IoExpand className="h-5 w-5" /></Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {tools.map(tool => (
          <div key={tool.id} className="flex flex-col gap-2">
            <Label htmlFor={tool.id}>{tool.label}</Label>
            <Slider id={tool.id} defaultValue={tool.defaultValue} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditingTools;