import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  checked, 
  onChange, 
  disabled = false 
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white
        ${checked ? 'bg-gray-900 shadow-gray-300' : 'bg-gray-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out
          ${checked ? 'translate-x-6 shadow-gray-200' : 'translate-x-1'}
        `}
      />
    </button>
  );
};