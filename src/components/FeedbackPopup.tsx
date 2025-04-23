
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X } from 'lucide-react';

interface FeedbackPopupProps {
  onSubmit: (rating: number, comment: string) => void;
  onClose: () => void;
}

const FeedbackPopup = ({ onSubmit, onClose }: FeedbackPopupProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl">How was your experience?</h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rate your navigation experience</label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${
                      rating >= value 
                        ? 'bg-vit-purple text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="feedback" className="text-sm font-medium">
                Tell us more about your experience
              </label>
              <Textarea
                id="feedback"
                placeholder="What went well? What could be improved?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-24"
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                type="submit" 
                className="flex-1 bg-vit-purple hover:bg-vit-purple/90"
                disabled={rating === 0}
              >
                Submit Feedback
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={onClose}
              >
                Skip
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackPopup;
