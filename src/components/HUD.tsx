
import React from 'react';

interface HUDProps {
  score: number;
  lives: number;
  level: number;
}

const HUD: React.FC<HUDProps> = ({ score, lives, level }) => {
  // Create heart icons based on lives
  const heartIcons = Array.from({ length: lives }, (_, index) => (
    <span key={index} className="text-red-500 text-2xl" role="img" aria-label="heart">
      ❤️
    </span>
  ));

  return (
    <div className="absolute top-0 right-0 left-0 p-4 flex justify-between items-center z-40">
      <div className="flex space-x-6 items-center">
        <div className="bg-black bg-opacity-70 p-2 rounded-md">
          <p className="text-neon-cyan text-sm md:text-base">
            SCORE: <span className="text-neon-yellow">{score}</span>
          </p>
        </div>
        
        <div className="bg-black bg-opacity-70 p-2 rounded-md">
          <p className="text-neon-cyan text-sm md:text-base">
            LEVEL: <span className="text-neon-green">{level}</span>
          </p>
        </div>
      </div>
      
      <div className="bg-black bg-opacity-70 p-2 rounded-md">
        <div className="flex space-x-1">
          {heartIcons}
        </div>
      </div>
    </div>
  );
};

export default HUD;
