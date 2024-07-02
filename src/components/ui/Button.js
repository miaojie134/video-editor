// src/components/ui/Button.js
const Button = ({ children, onClick }) => {
  return (
    <button className="rounded-md p-2 hover:bg-muted transition-colors" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
