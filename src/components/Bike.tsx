
import React from 'react';

interface BikeProps {
  position: number;
  isCollided: boolean;
}

const Bike: React.FC<BikeProps> = ({ position, isCollided }) => {
  return (
    <div 
      className={`bike transition-all duration-100 ${isCollided ? 'animate-flash' : ''}`}
      style={{ 
        left: `${position}px`, 
        transform: 'translateX(-50%)' 
      }}
    >
      <div className="relative">
        {/* Wheels */}
        <div className="absolute w-3 h-3 rounded-full bg-neon-cyan left-2 top-14 shadow-[0_0_5px_#0ff]"></div>
        <div className="absolute w-3 h-3 rounded-full bg-neon-cyan right-2 top-14 shadow-[0_0_5px_#0ff]"></div>
        <div className="absolute w-3 h-3 rounded-full bg-neon-cyan left-2 top-20 shadow-[0_0_5px_#0ff]"></div>
        <div className="absolute w-3 h-3 rounded-full bg-neon-cyan right-2 top-20 shadow-[0_0_5px_#0ff]"></div>

        {/* Body */}
        <div className="absolute w-8 h-16 rounded-t-lg bg-neon-magenta left-4 top-0 shadow-[0_0_10px_#f0f]"></div>
        
        {/* Handle */}
        <div className="absolute w-12 h-2 bg-neon-yellow top-3 left-2 shadow-[0_0_5px_#ff0]"></div>
        
        {/* Exhaust */}
        <div className="absolute w-1 h-3 bg-neon-cyan left-3 top-16 shadow-[0_0_5px_#0ff]"></div>
        <div className="absolute w-1 h-3 bg-neon-cyan right-3 top-16 shadow-[0_0_5px_#0ff]"></div>
        
        {/* Biker */}
        <div className="absolute w-6 h-6 rounded-full bg-white left-5 top-5"></div>
        <div className="absolute w-4 h-8 bg-neon-green left-6 top-8 shadow-[0_0_5px_#0f0]"></div>
      </div>
    </div>
  );
};

export default Bike;
