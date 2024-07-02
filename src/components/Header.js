// src/components/Header.js
import { IoMenu, IoSave, IoShareSocial, IoSettings } from 'react-icons/io5';
// import { Button } from './ui/Button';
import { Button } from './ui';


const Header = ({ title }) => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-4">
        <Button>
          <IoMenu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button>
          <IoSave className="h-5 w-5" />
        </Button>
        <Button>
          <IoShareSocial className="h-5 w-5" />
        </Button>
        <Button>
          <IoSettings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
