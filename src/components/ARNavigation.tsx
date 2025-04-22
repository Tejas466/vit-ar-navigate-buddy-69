
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from 'lucide-react';
import CameraView from './CameraView';
import PathVisualizer from './PathVisualizer';

const locations = [
  "Main Entrance",
  "Administrative Block",
  "Computer Engineering Dept.",
  "Mechanical Engineering Dept.",
  "Electronics Dept.",
  "Civil Engineering Dept.",
  "Library",
  "Cafeteria",
  "Auditorium",
  "Sports Complex",
];

const ARNavigation = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [navigationStarted, setNavigationStarted] = useState(false);
  
  const handleStartNavigation = () => {
    if (startLocation && destination) {
      setShowCamera(true);
      setNavigationStarted(true);
    }
  };
  
  const handleStopNavigation = () => {
    setShowCamera(false);
    setNavigationStarted(false);
  };
  
  return (
    <div className="w-full flex flex-col items-center">
      <Card className="w-full max-w-md bg-card shadow-lg">
        <CardContent className="p-6">
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
                <PathVisualizer from={startLocation} to={destination} />
              </div>
              
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">
                  Navigating from <span className="font-bold">{startLocation}</span> to{" "}
                  <span className="font-bold">{destination}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Follow the arrows on your screen
                </p>
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
    </div>
  );
};

export default ARNavigation;
