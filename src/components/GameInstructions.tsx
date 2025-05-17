
import React from 'react';
import { Button } from "@/components/ui/button";

interface GameInstructionsProps {
  onBack: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onBack }) => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-black bg-opacity-80 p-4 absolute z-50">
      <div className="neon-border bg-black p-6 md:p-8 w-full max-w-lg">
        <h2 className="text-2xl md:text-3xl mb-6 text-center text-neon-yellow neon-text">
          INSTRUCTIONS
        </h2>
        
        <div className="space-y-4 mb-6 text-sm md:text-base">
          <p className="text-white">
            ► Avoid obstacles by moving left or right
          </p>
          <p className="text-white">
            ► Each obstacle you avoid gives you points
          </p>
          <p className="text-white">
            ► You have 3 lives to start with
          </p>
          <p className="text-white">
            ► The game gets faster as you level up
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl text-neon-cyan mb-2 neon-text">CONTROLS:</h3>
          <div className="space-y-2 text-sm md:text-base">
            <p className="text-white">
              'A' or '←' - Move Left
            </p>
            <p className="text-white">
              'D' or '→' - Move Right
            </p>
            <p className="text-white">
              'P' - Pause Game
            </p>
            <p className="text-white">
              'ESC' - Exit to Menu
            </p>
          </div>
        </div>
        
        <Button 
          onClick={onBack}
          className="bg-neon-magenta text-white hover:bg-pink-600 w-full"
        >
          BACK TO MENU
        </Button>
      </div>
    </div>
  );
};

export default GameInstructions;
