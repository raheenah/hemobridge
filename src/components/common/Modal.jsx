import React from 'react';

export default function Modal({ children, onClose }) {
  return (
    <div
      onClick={(e) => {
        onClose();
        e.stopPropagation();
      }}
      className="fixed overflow-hidden bg-gray-100/50 inset-0 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] md:w-[65%] h-fit max-h-[95dvh] overflow-auto text-xs shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-4"
      >
        {children}
      </div>
    </div>
  );
}
