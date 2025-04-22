
import React, { useEffect, useRef, useState } from 'react';

const CameraView = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const constraints = {
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
        setErrorMessage("Camera access denied. Please grant permission to use AR navigation.");
      }
    }

    setupCamera();

    // Cleanup function to stop the camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  if (hasPermission === false) {
    return (
      <div className="h-[60vh] w-full flex items-center justify-center bg-muted rounded-md">
        <div className="text-center p-6">
          <p className="text-destructive font-medium text-lg">{errorMessage}</p>
          <p className="mt-2 text-muted-foreground">
            This feature requires camera access to provide AR navigation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-md">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {hasPermission === null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
          <p>Requesting camera permission...</p>
        </div>
      )}
    </div>
  );
};

export default CameraView;
