import React from 'react';

// Label component that supports children, htmlFor, and additional props
const Label = ({ htmlFor, children, className = '', ...props }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
