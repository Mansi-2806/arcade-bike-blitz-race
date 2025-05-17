
import React from 'react';

interface RoadProps {
  gameSpeed: number;
}

const Road: React.FC<RoadProps> = ({ gameSpeed }) => {
  // Calculate the animation duration based on game speed
  const animationDuration = 5000 / (gameSpeed / 10);
  
  const roadStripes = Array.from({ length: 10 }, (_, index) => {
    const stripePosition = (index * 10) - ((Date.now() / animationDuration * 100) % 100);
    return (
      <div
        key={index}
        className="road-stripes"
        style={{ top: `${stripePosition}%` }}
      ></div>
    );
  });

  return (
    <div 
      className="game-road h-full w-full"
      style={{
        backgroundImage: 'linear-gradient(0deg, #222, #333)',
      }}
    >
      {/* Side lines */}
      <div className="absolute h-full w-1/6 left-0 border-r-4 border-neon-yellow"></div>
      <div className="absolute h-full w-1/6 right-0 border-l-4 border-neon-yellow"></div>
      
      {/* Center dashed line */}
      <div className="absolute h-full w-0 left-1/2 border-l-2 border-dashed border-white opacity-80"></div>
      
      {/* Animated road stripes */}
      {roadStripes}
    </div>
  );
};

export default Road;
