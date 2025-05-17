
import React from 'react';
import { Button } from "@/components/ui/button";

interface GameOverProps {
  score: number;
  level: number;
  onRestart: () => void;
  onMainMenu: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, level, onRestart, onMainMenu }) => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-black bg-opacity-80 absolute z-50 p-4">
      <div className="neon-border bg-black p-8 w-full max-w-md">
        <h2 className="text-3xl md:text-4xl mb-6 text-center text-neon-magenta neon-text">
          GAME OVER
        </h2>
        
        <div className="space-y-4 mb-8">
          <p className="text-neon-yellow text-xl md:text-2xl text-center">
            Final Score: <span className="text-white">{score}</span>
          </p>
          <p className="text-neon-green text-xl md:text-2xl text-center">
            Level Reached: <span className="text-white">{level}</span>
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={onRestart}
            className="bg-neon-cyan text-black hover:bg-cyan-400 text-lg py-6 neon-text"
          >
            PLAY AGAIN
          </Button>
          
          <Button 
            onClick={onMainMenu}
            className="bg-neon-yellow text-black hover:bg-yellow-400 text-lg py-6 neon-text"
          >
            MAIN MENU
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
