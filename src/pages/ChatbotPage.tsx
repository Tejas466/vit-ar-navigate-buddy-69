
import React from 'react';
import NavBar from '@/components/NavBar';
import CollegeInfoBot from '@/components/CollegeInfoBot';

const ChatbotPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="container px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">VIT Info Bot</h1>
          <p className="text-muted-foreground mb-6">
            Your AI assistant for all information about VIT Pune
          </p>
          
          <CollegeInfoBot />
          
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h2 className="text-xl font-bold mb-4">About VIT Info Bot</h2>
            <p className="mb-4">
              The VIT Info Bot is an AI-powered assistant that provides comprehensive
              information about Vishwakarma Institute of Technology, Pune. The bot can
              answer questions about:
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-vit-purple"></div>
                <span>Admissions and eligibility</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-vit-purple"></div>
                <span>Courses and departments</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-vit-purple"></div>
                <span>Faculty information</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-vit-purple"></div>
                <span>Campus facilities</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-vit-purple"></div>
                <span>Placement statistics</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-vit-purple"></div>
                <span>Hostel accommodation</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-vit-purple"></div>
                <span>Fee structure</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-vit-purple"></div>
                <span>Events and activities</span>
              </li>
            </ul>
            
            <div className="bg-vit-purple/10 p-4 rounded">
              <p className="font-medium">
                Technology Behind the Bot
              </p>
              <p className="text-sm text-muted-foreground">
                This bot uses AI language models and web scraping technology to gather
                and process information about VIT Pune. The full version will include
                real-time updates from the college website and knowledge base to
                provide the most current information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
