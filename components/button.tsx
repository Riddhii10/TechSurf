// components/Button.tsx
import React, { ReactNode } from 'react';

// Define the props interface for the Button component
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode; // Accepts dynamic content inside the button
}

// Button component definition
const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  className = '',
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
