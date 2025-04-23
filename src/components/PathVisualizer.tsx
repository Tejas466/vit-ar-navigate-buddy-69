
import React, { useState, useEffect } from 'react';
import { ArrowBigRight } from 'lucide-react';

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
  const [arrowPosition] = useState({ x: 50, y: 50 });
  const [nearbyDoor, setNearbyDoor] = useState<any>(null);
  const [showDoorInfo, setShowDoorInfo] = useState(false);
  
  // Check for nearby doors
  useEffect(() => {
    const door = mockDoors.find(d => Math.abs(d.atProgress - progress) < 5);
    if (door) {
      setNearbyDoor(door);
      setShowDoorInfo(true);
      
      // Hide door info after 3 seconds
      setTimeout(() => {
        setShowDoorInfo(false);
      }, 3000);
    } else {
      setNearbyDoor(null);
    }
  }, [progress]);
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* AR Arrow */}
      <div 
        className="absolute z-10 flex flex-col items-center"
        style={{ 
          left: `${arrowPosition.x}%`, 
          top: `${arrowPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="glass rounded-xl p-4 shadow-lg">
          <ArrowBigRight 
            size={48} 
            className="text-vit-teal animate-pulse"
            strokeWidth={3}
          />
        </div>
      </div>
      
      {/* Door detection overlay */}
      {nearbyDoor && (
        <div 
          className="absolute border-4 border-yellow-400 rounded-lg animate-pulse"
          style={{
            left: `${nearbyDoor.position.x - 10}%`,
            top: `${nearbyDoor.position.y - 15}%`,
            width: '20%',
            height: '30%',
          }}
        >
          {showDoorInfo && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 glass px-4 py-2 rounded-lg shadow-lg">
              <p className="text-sm font-medium">{nearbyDoor.name}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Path indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass px-4 py-2 rounded-lg shadow-lg">
        <p className="text-sm font-medium">
          Following optimal path to {to}
        </p>
      </div>
      
      {/* Destination marker */}
      {progress > 95 && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-20 h-20 bg-vit-teal/20 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-10 h-10 bg-vit-teal rounded-full"></div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 glass px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm font-medium">{to}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PathVisualizer;
