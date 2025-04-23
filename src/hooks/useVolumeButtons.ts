
import { useEffect, useState } from 'react';
import { App } from '@capacitor/app';

export const useVolumeButtons = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleVolumeButton = async (event: any) => {
      if (event.volumeButton === 'up') {
        setRotation(prev => (prev + 90) % 360);
      } else if (event.volumeButton === 'down') {
        setRotation(prev => (prev - 90 + 360) % 360);
      }
    };

    App.addListener('volumeButtonPressed', handleVolumeButton);

    return () => {
      App.removeAllListeners();
    };
  }, []);

  return rotation;
};
