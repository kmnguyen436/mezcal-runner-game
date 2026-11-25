'use client';

import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export default function Button({
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 disabled:hover:bg-blue-600 shadow-lg hover:shadow-blue-500/50',
    secondary:
      'bg-slate-700 text-slate-100 hover:bg-slate-600 active:scale-95 disabled:hover:bg-slate-700 border border-slate-500',
  };

  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg w-full sm:w-auto',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </button>
  );
}
