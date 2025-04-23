
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from 'lucide-react';
import CameraView from './CameraView';
import PathVisualizer from './PathVisualizer';
import { useIsMobile } from '@/hooks/use-mobile';
import ARInstructions from './ARInstructions';
import FeedbackPopup from './FeedbackPopup';
import { toast } from '@/hooks/use-toast';

const locations = [
  "1301",
  "1302",
  "1303",
  "1307",
  "1308",
  "1309",
  "Conference Hall",
  "1314",
  "1316",
];

const ARNavigation = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [navigationProgress, setNavigationProgress] = useState(0);
  const [reachedDestination, setReachedDestination] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (navigationStarted) {
      // Simulate navigation progress
      const interval = setInterval(() => {
        setNavigationProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setReachedDestination(true);
              setShowFeedback(true);
            }, 1000);
            return 100;
          }
          return newProgress;
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [navigationStarted]);
  
  const handleStartNavigation = () => {
    if (startLocation && destination) {
      setShowCamera(true);
      setNavigationStarted(true);
      setNavigationProgress(0);
      setReachedDestination(false);
      setShowInstructions(true);
      
      toast({
        title: "Navigation Started",
        description: `Navigating from ${startLocation} to ${destination}`,
      });
      
      // Hide instructions after 5 seconds
      setTimeout(() => {
        setShowInstructions(false);
      }, 5000);
    }
  };
  
  const handleStopNavigation = () => {
    setShowCamera(false);
    setNavigationStarted(false);
    setNavigationProgress(0);
    setReachedDestination(false);
    setShowFeedback(false);
  };
  
  const handleFeedbackSubmit = (rating, comment) => {
    toast({
      title: "Thank You!",
      description: "Your feedback helps improve our navigation system.",
    });
    setShowFeedback(false);
  };
  
  return (
    <div className="w-full flex flex-col items-center">
      <Card className={`w-full ${isMobile ? 'max-w-full' : 'max-w-md'} bg-card shadow-lg`}>
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">VIT Campus Navigation</h2>
          
          {!showCamera ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Location</label>
                <Select value={startLocation} onValueChange={setStartLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleStartNavigation} 
                className="w-full bg-vit-purple hover:bg-vit-purple/90"
                disabled={!startLocation || !destination || startLocation === destination}
              >
                Start Navigation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              {startLocation === destination && (
                <p className="text-sm text-destructive">Start and destination cannot be the same</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <CameraView />
                
                {navigationStarted && !reachedDestination && (
                  <PathVisualizer 
                    from={startLocation} 
                    to={destination} 
                    progress={navigationProgress}
                  />
                )}
                
                {showInstructions && <ARInstructions />}
                
                {/* Progress indicator removed as requested */}
              </div>
              
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">
                  Navigating from <span className="font-bold">{startLocation}</span> to{" "}
                  <span className="font-bold">{destination}</span>
                </p>
                {reachedDestination ? (
                  <p className="text-xs text-green-600 font-medium">
                    You have reached your destination!
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Follow the arrows on your screen
                  </p>
                )}
              </div>
              
              <Button 
                onClick={handleStopNavigation} 
                variant="destructive" 
                className="w-full"
              >
                Stop Navigation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {showFeedback && (
        <FeedbackPopup onSubmit={handleFeedbackSubmit} onClose={() => setShowFeedback(false)} />
      )}
    </div>
  );
};

export default ARNavigation;
