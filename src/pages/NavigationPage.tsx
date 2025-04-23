
import React from 'react';
import NavBar from '@/components/NavBar';
import ARNavigation from '@/components/ARNavigation';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const NavigationPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className={`container px-4 py-6 ${isMobile ? 'pb-16' : 'py-8'} flex-1`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">AR Navigation</h1>
            <Badge className="bg-vit-teal">Beta</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Navigate VIT Pune campus with augmented reality guidance
          </p>
          
          <ARNavigation />
          
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h2 className="text-xl font-bold mb-4">How It Works</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Select your current location and destination</li>
              <li>Grant camera permissions when prompted</li>
              <li>Hold your phone up and follow the AR arrows</li>
              <li>Yellow boxes indicate doors and important landmarks</li>
              <li>The path is optimized using reinforcement learning algorithms</li>
              <li>Real-time updates will guide you to your destination</li>
            </ol>
            
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="text-yellow-800 font-medium">Note</p>
              <p className="text-yellow-700 text-sm">
                This is a visual simulation. In the full version, 
                AR navigation will use your phone's sensors and computer vision 
                to provide precise indoor navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;
