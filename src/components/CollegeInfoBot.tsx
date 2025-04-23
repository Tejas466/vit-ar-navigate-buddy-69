
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from 'lucide-react';
import { getGeminiResponse } from '@/utils/gemini';
import { useToast } from '@/hooks/use-toast';

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
      text: "Hello! I'm VITBot, your AI assistant for VIT Pune. How can I help you today? You can ask me about departments, admission procedures, facilities, faculty, or any other information about VIT Pune.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Add a temporary thinking message
    const thinkingId = messages.length + 2;
    setMessages(prev => [...prev, {
      id: thinkingId,
      text: "Thinking...",
      sender: 'bot',
      timestamp: new Date()
    }]);
    
    try {
      const response = await getGeminiResponse(input);
      
      // Replace thinking message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === thinkingId 
          ? {
              id: thinkingId,
              text: response,
              sender: 'bot',
              timestamp: new Date()
            }
          : msg
      ));
    } catch (error) {
      console.error('Error:', error);
      
      // Replace thinking message with error message
      setMessages(prev => prev.map(msg => 
        msg.id === thinkingId 
          ? {
              id: thinkingId,
              text: "I apologize, but I'm having trouble processing your request at the moment. Please try again later.",
              sender: 'bot',
              timestamp: new Date()
            }
          : msg
      ));
      
      toast({
        title: "Connection Error",
        description: "Could not connect to the VIT knowledge base.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
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
                  <p className="whitespace-pre-wrap">{message.text}</p>
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
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
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
