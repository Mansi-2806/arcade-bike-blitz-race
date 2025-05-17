
import React from 'react';
import { Button } from "@/components/ui/button";

interface PauseModalProps {
  onResume: () => void;
  onMainMenu: () => void;
}

const PauseModal: React.FC<PauseModalProps> = ({ onResume, onMainMenu }) => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-black bg-opacity-80 absolute z-50">
      <div className="neon-border bg-black p-8 w-full max-w-sm">
        <h2 className="text-3xl mb-8 text-center text-neon-cyan neon-text">
          GAME PAUSED
        </h2>
        
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={onResume}
            className="bg-neon-green text-black hover:bg-green-400 py-6 text-lg neon-text"
          >
            RESUME
          </Button>
          
          <Button 
            onClick={onMainMenu}
            className="bg-neon-yellow text-black hover:bg-yellow-400 py-6 text-lg neon-text"
          >
            MAIN MENU
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PauseModal;
