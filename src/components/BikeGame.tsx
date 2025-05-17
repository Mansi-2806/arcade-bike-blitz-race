import React, { useState, useEffect, useRef, useCallback } from 'react';
import Bike from './Bike';
import Obstacle from './Obstacle';
import Road from './Road';
import HUD from './HUD';
import GameMenu from './GameMenu';
import GameOver from './GameOver';
import GameInstructions from './GameInstructions';
import PauseModal from './PauseModal';
import { toast } from '@/components/ui/use-toast';

// Game states
enum GameState {
  MENU,
  PLAYING,
  PAUSED,
  GAME_OVER,
  INSTRUCTIONS
}

// Initial settings
const ROAD_WIDTH = 600;
const INITIAL_SPEED = 50;
const LEVEL_UP_SCORE = 100;

const BikeGame: React.FC = () => {
  // Use MENU as the default state to ensure the menu is displayed on load
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [bikePosition, setBikePosition] = useState(ROAD_WIDTH / 2);
  const [obstacles, setObstacles] = useState<Array<{id: number, x: number, y: number, speed: number}>>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_SPEED);
  const [isCollided, setIsCollided] = useState(false);
  
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const obstacleIdRef = useRef(0);
  
  const roadWidthRef = useRef(ROAD_WIDTH);
  const lastTimeRef = useRef(0);
  
  // Handle window resize to make the game responsive
  useEffect(() => {
    const handleResize = () => {
      if (gameContainerRef.current) {
        const containerWidth = gameContainerRef.current.clientWidth;
        roadWidthRef.current = Math.min(containerWidth, ROAD_WIDTH);
        // Re-center bike
        if (gameState === GameState.PLAYING) {
          setBikePosition(roadWidthRef.current / 2);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [gameState]);
  
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === GameState.PLAYING) {
        const movement = 20;
        const roadWidth = roadWidthRef.current;
        
        switch (e.key) {
          case 'ArrowLeft':
          case 'a':
          case 'A':
            setBikePosition(prev => Math.max(50, prev - movement));
            break;
          case 'ArrowRight':
          case 'd':
          case 'D':
            setBikePosition(prev => Math.min(roadWidth - 50, prev + movement));
            break;
          case 'p':
          case 'P':
            setGameState(GameState.PAUSED);
            break;
          case 'Escape':
            setGameState(GameState.MENU);
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);
  
  // Generate new obstacles
  const generateObstacle = useCallback(() => {
    if (gameState !== GameState.PLAYING) return;
    
    const roadWidth = roadWidthRef.current;
    const newObstacle = {
      id: obstacleIdRef.current++,
      x: 50 + Math.random() * (roadWidth - 100),
      y: -100,
      speed: 1000 - (level * 100) + Math.random() * 500
    };
    
    setObstacles(prev => [...prev, newObstacle]);
  }, [gameState, level]);
  
  // Obstacle generation
  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;
    
    const interval = setInterval(() => {
      generateObstacle();
    }, 2000 - (level * 100));
    
    return () => clearInterval(interval);
  }, [gameState, level, generateObstacle]);
  
  // Move obstacles and check collision
  const updateGameState = useCallback((timestamp: number) => {
    if (gameState !== GameState.PLAYING) return;
    
    // Calculate time delta
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    // Move obstacles
    setObstacles(prev => {
      return prev.map(obs => {
        // Calculate new Y position based on speed
        const newY = obs.y + (deltaTime * 0.1 * (gameSpeed / INITIAL_SPEED));
        return { ...obs, y: newY };
      }).filter(obs => {
        // Remove obstacles that went off-screen and add score
        if (obs.y > window.innerHeight) {
          setScore(prevScore => {
            const newScore = prevScore + 10;
            
            // Level up if score threshold reached
            if (newScore % LEVEL_UP_SCORE === 0) {
              setLevel(prevLevel => {
                const newLevel = prevLevel + 1;
                setGameSpeed(INITIAL_SPEED + (newLevel * 10));
                
                toast({
                  title: "Level Up!",
                  description: `You've reached level ${newLevel}!`,
                  duration: 2000,
                });
                
                return newLevel;
              });
            }
            
            return newScore;
          });
          return false;
        }
        return true;
      });
    });
    
    // Check for collisions
    setObstacles(prev => {
      const bikeHitbox = {
        x: bikePosition - 25,
        y: window.innerHeight - 130,
        width: 50,
        height: 80
      };
      
      let collision = false;
      
      const updatedObstacles = prev.filter(obs => {
        const obstacleHitbox = {
          x: obs.x - 30,
          y: obs.y,
          width: 60,
          height: 60
        };
        
        // Simple rectangular collision detection
        if (
          bikeHitbox.x < obstacleHitbox.x + obstacleHitbox.width &&
          bikeHitbox.x + bikeHitbox.width > obstacleHitbox.x &&
          bikeHitbox.y < obstacleHitbox.y + obstacleHitbox.height &&
          bikeHitbox.y + bikeHitbox.height > obstacleHitbox.y
        ) {
          collision = true;
          return false; // Remove collided obstacle
        }
        
        return true;
      });
      
      if (collision && !isCollided) {
        setIsCollided(true);
        setLives(prev => {
          const newLives = prev - 1;
          
          if (newLives <= 0) {
            setGameState(GameState.GAME_OVER);
          } else {
            toast({
              title: "Crash!",
              description: `Lives remaining: ${newLives}`,
              variant: "destructive",
              duration: 2000,
            });
            
            // Reset collision state after animation
            setTimeout(() => setIsCollided(false), 500);
          }
          
          return newLives;
        });
      }
      
      return updatedObstacles;
    });
    
    gameLoopRef.current = requestAnimationFrame(updateGameState);
  }, [gameState, bikePosition, gameSpeed, isCollided, level]);
  
  // Game loop
  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      lastTimeRef.current = performance.now();
      gameLoopRef.current = requestAnimationFrame(updateGameState);
    } else if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, updateGameState]);
  
  // Reset game state
  const resetGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameSpeed(INITIAL_SPEED);
    setBikePosition(roadWidthRef.current / 2);
    setObstacles([]);
    setIsCollided(false);
    obstacleIdRef.current = 0;
  }, []);
  
  // Start new game
  const handleStartGame = () => {
    resetGame();
    setGameState(GameState.PLAYING);
  };
  
  // Show main menu
  const handleMainMenu = () => {
    setGameState(GameState.MENU);
  };
  
  // Debug to check game state
  console.log('Current game state:', gameState);

  return (
    <div 
      ref={gameContainerRef} 
      className="game-container relative h-screen max-w-screen-lg w-full overflow-hidden bg-game-dark"
    >
      {/* Road and background */}
      <div className="relative w-full h-full">
        {/* Only render game elements when playing */}
        {(gameState === GameState.PLAYING || gameState === GameState.PAUSED) && (
          <>
            <Road gameSpeed={gameSpeed} />
            
            {/* Obstacles */}
            {obstacles.map(obstacle => (
              <Obstacle 
                key={obstacle.id}
                x={obstacle.x}
                y={obstacle.y}
                speed={obstacle.speed}
              />
            ))}
            
            {/* Player bike */}
            <Bike position={bikePosition} isCollided={isCollided} />
            
            {/* HUD */}
            <HUD score={score} lives={lives} level={level} />
          </>
        )}
      </div>
      
      {/* Game states/overlays - Make sure they're always above other elements */}
      {gameState === GameState.MENU && (
        <GameMenu 
          onStartGame={handleStartGame}
          onShowInstructions={() => setGameState(GameState.INSTRUCTIONS)}
        />
      )}
      
      {gameState === GameState.INSTRUCTIONS && (
        <GameInstructions onBack={() => setGameState(GameState.MENU)} />
      )}
      
      {gameState === GameState.PAUSED && (
        <PauseModal 
          onResume={() => setGameState(GameState.PLAYING)}
          onMainMenu={handleMainMenu}
        />
      )}
      
      {gameState === GameState.GAME_OVER && (
        <GameOver 
          score={score}
          level={level}
          onRestart={handleStartGame}
          onMainMenu={handleMainMenu}
        />
      )}
    </div>
  );
};

export default BikeGame;
