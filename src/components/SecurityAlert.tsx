
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Placeholder alert data
const securityAlerts = [
  {
    id: "alert1",
    location: "Main Building Entrance",
    type: "Suspicious Activity",
    confidence: 87,
    timestamp: "2025-04-22T14:30:00",
    status: "investigating"
  },
  {
    id: "alert2",
    location: "Library - Second Floor",
    type: "Unattended Bag",
    confidence: 92,
    timestamp: "2025-04-22T14:15:00",
    status: "resolved"
  },
  {
    id: "alert3",
    location: "Parking Lot B",
    type: "Suspicious Activity",
    confidence: 78,
    timestamp: "2025-04-22T13:45:00",
    status: "false_alarm"
  },
  {
    id: "alert4",
    location: "Computer Lab 3",
    type: "Unauthorized Access",
    confidence: 95,
    timestamp: "2025-04-22T12:20:00",
    status: "resolved"
  }
];

const SecurityAlert = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'investigating':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
      case 'false_alarm':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">False Alarm</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filterAlerts = (alerts: typeof securityAlerts) => {
    if (activeTab === 'all') return alerts;
    return alerts.filter(alert => alert.status === activeTab);
  };

  const displayAlerts = filterAlerts(securityAlerts);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Security Alerts</CardTitle>
          <div className="flex items-center gap-2">
            <Switch 
              id="notifications" 
              checked={notificationsEnabled} 
              onCheckedChange={setNotificationsEnabled} 
            />
            <Label htmlFor="notifications">Notifications</Label>
          </div>
        </div>
        <CardDescription>
          Suspicious activity alerts detected by the security system
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="investigating">Active</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {displayAlerts.length > 0 ? (
              <div className="space-y-3">
                {displayAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="p-3 border rounded-md flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <div className="font-medium">{alert.location}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{alert.type}</span>
                        <span>•</span>
                        <span>Confidence: {alert.confidence}%</span>
                        <span>•</span>
                        <span>{formatTime(alert.timestamp)}</span>
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(alert.status)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No alerts in this category
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Archive</Button>
        <Button className="bg-vit-purple hover:bg-vit-purple/90">Report Incident</Button>
      </CardFooter>
    </Card>
  );
};

export default SecurityAlert;
