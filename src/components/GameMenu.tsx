
import React from 'react';
import { Button } from "@/components/ui/button";

interface GameMenuProps {
  onStartGame: () => void;
  onShowInstructions: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onStartGame, onShowInstructions }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black bg-opacity-80 p-6 absolute z-50">
      <div className="neon-border bg-black p-8 w-full max-w-md">
        <h1 className="text-4xl md:text-5xl mb-8 text-center text-neon-cyan neon-text font-bold">
          BIKE RACING
        </h1>
        
        <div className="flex flex-col gap-6 mt-8">
          <Button 
            onClick={onStartGame}
            className="bg-neon-green text-black hover:bg-green-400 text-lg py-6 neon-text"
          >
            START GAME
          </Button>
          
          <Button 
            onClick={onShowInstructions}
            className="bg-neon-yellow text-black hover:bg-yellow-400 text-lg py-6 neon-text"
          >
            INSTRUCTIONS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
