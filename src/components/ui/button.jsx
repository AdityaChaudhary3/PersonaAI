import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-black disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};