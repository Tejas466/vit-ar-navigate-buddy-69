
import React from 'react';
import NavBar from '@/components/NavBar';
import SecurityAlert from '@/components/SecurityAlert';

const SecurityPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="container px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Security Monitoring</h1>
          <p className="text-muted-foreground mb-6">
            AI-powered detection system for suspicious activities
          </p>
          
          <SecurityAlert />
          
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h2 className="text-xl font-bold mb-4">About The Security System</h2>
            <p className="mb-4">
              Our security monitoring system uses advanced computer vision and deep learning
              algorithms to detect suspicious activities across the VIT campus. The system
              can identify potential security concerns such as:
            </p>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Unauthorized access to restricted areas</li>
              <li>Suspicious behavior patterns</li>
              <li>Unattended objects</li>
              <li>Physical altercations</li>
              <li>Other security incidents</li>
            </ul>
            
            <p className="text-muted-foreground">
              The system provides real-time alerts to security personnel, allowing for
              rapid response to potential security threats. All alerts are monitored
              and verified to minimize false positives.
            </p>
            
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-blue-800 font-medium">Privacy Note</p>
              <p className="text-blue-700 text-sm">
                This system is designed with privacy in mind. No personal identification
                information is stored or processed, and the system focuses solely on
                detecting behavioral patterns that may indicate security concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
