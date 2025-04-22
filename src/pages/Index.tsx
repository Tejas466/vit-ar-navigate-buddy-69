
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-background to-muted overflow-hidden">
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-vit-purple to-vit-teal bg-clip-text text-transparent">
                AR-Based Indoor Navigation
              </h1>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground">
                Revolutionizing campus navigation at VIT Pune with augmented reality,
                reinforcement learning, and intelligent security features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-vit-purple hover:bg-vit-purple/90">
                  <Link to="/navigation">
                    Start Navigation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/chatbot">
                    Ask VIT Info Bot
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Features Section */}
        <section className="py-16 container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="feature-card hover:border-vit-purple transition-colors">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-vit-purple/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-vit-purple">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">AR Navigation</h3>
                  <p className="text-muted-foreground mb-4">
                    Navigate VIT Pune campus with augmented reality arrows guiding your path.
                    Optimized routes using reinforcement learning algorithms.
                  </p>
                  <Link 
                    to="/navigation"
                    className="text-vit-purple flex items-center font-medium text-sm hover:underline"
                  >
                    Try Navigation <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="feature-card hover:border-vit-orange transition-colors">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-vit-orange/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-vit-orange">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Security Monitoring</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced suspicious activity detection system to identify potential security concerns
                    using computer vision and deep learning.
                  </p>
                  <Link 
                    to="/security"
                    className="text-vit-orange flex items-center font-medium text-sm hover:underline"
                  >
                    View Security <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="feature-card hover:border-vit-teal transition-colors">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-vit-teal/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-vit-teal">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">VIT Info Bot</h3>
                  <p className="text-muted-foreground mb-4">
                    Interactive chatbot with comprehensive information about VIT Pune,
                    powered by AI and web scraping technology.
                  </p>
                  <Link 
                    to="/chatbot"
                    className="text-vit-teal flex items-center font-medium text-sm hover:underline"
                  >
                    Chat with Bot <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">About The Project</h2>
              <p className="text-muted-foreground mb-8">
                This AR-based indoor navigation system for VIT Pune incorporates cutting-edge 
                technologies to enhance campus experience. Using augmented reality for visual navigation, 
                reinforcement learning for path optimization, and AI for security monitoring and 
                information assistance, this project aims to revolutionize how students and visitors 
                interact with the campus environment.
              </p>
              <div className="bg-card rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold mb-2">Technical Stack</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="bg-vit-purple">Augmented Reality</Badge>
                  <Badge className="bg-vit-teal">Reinforcement Learning</Badge>
                  <Badge className="bg-vit-orange">Computer Vision</Badge>
                  <Badge className="bg-muted text-foreground">AI Chatbot</Badge>
                  <Badge className="bg-muted text-foreground">Web Scraping</Badge>
                  <Badge className="bg-muted text-foreground">React</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="bg-card py-8">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 AR-Based Indoor Navigation Project for VIT Pune
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
