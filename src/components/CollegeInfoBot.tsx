
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Send } from 'lucide-react';

// Sample bot responses for different queries
const botResponses = {
  "hello": "Hello! I'm VITBot, your AI assistant for VIT Pune. How can I help you today?",
  "hi": "Hi there! I'm VITBot. Ask me anything about VIT Pune!",
  "who are you": "I'm VITBot, an AI assistant designed to help you navigate VIT Pune and answer questions about the college.",
  "admission": "For admissions at VIT Pune, you need to appear for MHT-CET or JEE exams. The admission process typically begins in June-July. Visit the official VIT Pune website for detailed eligibility criteria and important dates.",
  "courses": "VIT Pune offers various engineering programs including Computer Engineering, Information Technology, Mechanical Engineering, Civil Engineering, Electronics & Telecommunication, and more. They also offer postgraduate programs in several disciplines.",
  "location": "Vishwakarma Institute of Technology (VIT) is located at 666, Upper Indiranagar, Bibwewadi, Pune, Maharashtra 411037.",
  "faculty": "VIT Pune has highly qualified faculty members with extensive academic and industry experience. Many professors hold Ph.D. degrees and are active researchers in their fields.",
  "facilities": "VIT Pune campus includes modern laboratories, a comprehensive library, sports facilities, hostels, cafeterias, an auditorium, and Wi-Fi connectivity throughout the campus.",
  "placements": "VIT Pune has an excellent placement record with top companies like Microsoft, Google, Amazon, Infosys, and TCS regularly visiting for recruitment. The average package for 2024 was approximately 8 LPA with the highest being around 45 LPA.",
  "hostel": "VIT Pune has separate hostel facilities for boys and girls. The hostels provide accommodation with essential amenities including mess facilities, Wi-Fi, recreation areas, and 24/7 security.",
  "fees": "The fees for engineering programs at VIT Pune typically range from Rs. 1.5 to 2 lakhs per annum, depending on the specific program. Please check the official website for the most current fee structure.",
  "departments": "VIT Pune has several departments including Computer Engineering, Information Technology, Mechanical Engineering, Civil Engineering, Electronics & Telecommunication, Instrumentation Engineering, and more."
};

// Function to find the best matching response
const findResponse = (query: string): string => {
  const lowercaseQuery = query.toLowerCase();
  
  // Check for exact matches first
  if (botResponses[lowercaseQuery as keyof typeof botResponses]) {
    return botResponses[lowercaseQuery as keyof typeof botResponses];
  }
  
  // Check for keywords in the query
  for (const key of Object.keys(botResponses)) {
    if (lowercaseQuery.includes(key)) {
      return botResponses[key as keyof typeof botResponses];
    }
  }
  
  // Default response
  return "I don't have specific information about that yet. As a prototype, my knowledge is limited. In the full version, I'll be connected to comprehensive data about VIT Pune through web scraping and AI agents.";
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const CollegeInfoBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm VITBot, your AI assistant for VIT Pune. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: findResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <Card className="w-full h-[70vh] flex flex-col">
      <CardHeader>
        <CardTitle>VIT Info Bot</CardTitle>
        <CardDescription>
          Ask me anything about VIT Pune College
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-[calc(70vh-180px)]">
          <div className="space-y-4 p-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-vit-purple text-white'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="border-t pt-3">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask about VIT Pune..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim()}
            className="bg-vit-purple hover:bg-vit-purple/90"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CollegeInfoBot;
