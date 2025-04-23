
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface PathVisualizerProps {
  from: string;
  to: string;
  progress: number;
}

// Mock door locations (in the visual field)
const mockDoors = [
  { id: 1, name: "Room 101", position: { x: 30, y: 50 }, atProgress: 25 },
  { id: 2, name: "Computer Lab", position: { x: 70, y: 45 }, atProgress: 50 },
  { id: 3, name: "Library", position: { x: 40, y: 60 }, atProgress: 75 },
];

const PathVisualizer = ({ from, to, progress }: PathVisualizerProps) => {
  const [arrowPosition, setArrowPosition] = useState({ x: 50, y: 50 });
  const [arrowRotation, setArrowRotation] = useState(0);
  const [nearbyDoor, setNearbyDoor] = useState<any>(null);
  const [showDoorInfo, setShowDoorInfo] = useState(false);
  
  // Simulate arrow movement based on navigation progress
  useEffect(() => {
    // Move arrow along a simulated path
    const calculateNewPosition = () => {
      // Simulate a curved path with some randomness
      const baseX = 50 + Math.sin(progress / 15) * 20;
      const baseY = 50 - progress / 4;
      
      // Add slight randomness to make it feel more natural
      const randomX = baseX + (Math.random() - 0.5) * 2;
      const randomY = baseY + (Math.random() - 0.5) * 2;
      
      return { x: randomX, y: randomY };
    };
    
    const calculateRotation = () => {
      // Simulate turning at different points
      const baseRotation = progress / 5;
      return baseRotation + Math.sin(progress / 10) * 20;
    };
    
    // Check for nearby doors
    const checkForDoors = () => {
      const door = mockDoors.find(d => Math.abs(d.atProgress - progress) < 5);
      if (door) {
        setNearbyDoor(door);
        setShowDoorInfo(true);
        
        // Hide door info after 3 seconds
        setTimeout(() => {
          setShowDoorInfo(false);
        }, 3000);
        
        return true;
      }
      
      setNearbyDoor(null);
      return false;
    };
    
    const nearDoor = checkForDoors();
    
    // Only move arrow if not near a door
    if (!nearDoor) {
      setArrowPosition(calculateNewPosition());
      setArrowRotation(calculateRotation());
    }
  }, [progress]);
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Arrow indicator */}
      <div 
        className="absolute z-10 flex flex-col items-center"
        style={{ 
          left: `${arrowPosition.x}%`, 
          top: `${arrowPosition.y}%`, 
          transform: `translate(-50%, -50%) rotate(${arrowRotation}deg)`
        }}
      >
        <div className="mb-4 glass rounded-full p-3">
          <ArrowRight size={32} className="text-vit-teal animate-pulse-arrow" />
        </div>
      </div>
      
      {/* Door detection overlay */}
      {nearbyDoor && (
        <div 
          className="absolute border-2 border-yellow-400 rounded-md animate-pulse"
          style={{
            left: `${nearbyDoor.position.x - 10}%`,
            top: `${nearbyDoor.position.y - 15}%`,
            width: '20%',
            height: '30%',
          }}
        >
          {showDoorInfo && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 glass px-3 py-1 rounded-full whitespace-nowrap">
              <p className="text-xs font-medium">{nearbyDoor.name}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Distance remaining indicator */}
      <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full">
        <p className="text-xs">
          Path optimized with RL: ~{Math.round(120 * (1 - progress/100))}m remaining
        </p>
      </div>
      
      {/* Simulated destination marker */}
      {progress > 95 && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-16 h-16 bg-vit-teal/20 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-vit-teal rounded-full"></div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 glass px-3 py-1 rounded-full whitespace-nowrap">
            <p className="text-xs font-medium">{to}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PathVisualizer;
