import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[200] focus:px-4 focus:py-3 focus:bg-[#EAFE07] focus:text-[#050A1C] focus:font-bold focus:rounded-md"
    >
      Skip to content
    </a>
  );
};

export default SkipLink;
