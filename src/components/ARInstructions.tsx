
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

const ARInstructions = () => {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) return null;
  
  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
      <div className="bg-card rounded-lg p-6 max-w-xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">How to Use AR Navigation</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setDismissed(true)}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ul className="space-y-2 text-sm mb-4">
          <li className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-vit-purple flex items-center justify-center text-white">1</div>
            <span>Hold your phone up at eye level</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-vit-purple flex items-center justify-center text-white">2</div>
            <span>Follow the green arrows on your screen</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-vit-purple flex items-center justify-center text-white">3</div>
            <span>Yellow boxes indicate doors or landmarks</span>
          </li>
        </ul>
        <Button 
          onClick={() => setDismissed(true)}
          className="w-full bg-vit-purple"
        >
          Got it!
        </Button>
      </div>
    </div>
  );
};

export default ARInstructions;
