
import React from 'react';

interface ObstacleProps {
  x: number;
  y: number;
  speed: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ x, y, speed }) => {
  return (
    <div 
      className="obstacle transform -translate-x-1/2"
      style={{ 
        left: `${x}px`,
        top: `${y}px`,
        transition: `top ${speed}ms linear`
      }}
    >
      {/* Inner details */}
      <div className="w-full h-full border-4 border-red-600 bg-red-800 relative flex items-center justify-center">
        <div className="absolute w-4/5 h-1 bg-yellow-400 top-1/4"></div>
        <div className="absolute w-4/5 h-1 bg-yellow-400 bottom-1/4"></div>
        <div className="absolute w-3/5 h-3/5 border-2 border-red-400 rounded-full"></div>
        <div className="absolute w-2/5 h-2/5 bg-red-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Obstacle;
