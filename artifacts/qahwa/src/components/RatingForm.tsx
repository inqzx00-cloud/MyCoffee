import { useState } from "react";
import { StarRating } from "./StarRating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Wifi, Heart } from "lucide-react";

interface RatingFormProps {
  onSubmit: (ratings: { coffee: number; vibe: number; internet: number }) => void;
  isSubmitting?: boolean;
}

export function RatingForm({ onSubmit, isSubmitting }: RatingFormProps) {
  const [coffee, setCoffee] = useState(0);
  const [vibe, setVibe] = useState(0);
  const [internet, setInternet] = useState(0);

  const isValid = coffee > 0 && vibe > 0 && internet > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({ coffee, vibe, internet });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="rating-form">
      <Card className="border-none shadow-md bg-card">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Coffee className="w-5 h-5 text-secondary" />
                <label className="font-serif font-medium text-lg">Coffee Quality</label>
              </div>
              <span className="text-sm text-muted-foreground">{coffee > 0 ? `${coffee}/5` : "Tap to rate"}</span>
            </div>
            <StarRating value={coffee} onChange={setCoffee} size="lg" />
          </div>

          <div className="h-px bg-border/50 w-full" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Heart className="w-5 h-5 text-secondary" />
                <label className="font-serif font-medium text-lg">Vibe & Atmosphere</label>
              </div>
              <span className="text-sm text-muted-foreground">{vibe > 0 ? `${vibe}/5` : "Tap to rate"}</span>
            </div>
            <StarRating value={vibe} onChange={setVibe} size="lg" />
          </div>

          <div className="h-px bg-border/50 w-full" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Wifi className="w-5 h-5 text-secondary" />
                <label className="font-serif font-medium text-lg">Internet & Seating</label>
              </div>
              <span className="text-sm text-muted-foreground">{internet > 0 ? `${internet}/5` : "Tap to rate"}</span>
            </div>
            <StarRating value={internet} onChange={setInternet} size="lg" />
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full h-12 text-lg font-serif tracking-wide bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-all hover:-translate-y-0.5" 
        disabled={!isValid || isSubmitting}
        data-testid="button-submit-rating"
      >
        {isSubmitting ? "Brewing..." : "Submit Rating (+15 pts)"}
      </Button>
    </form>
  );
}
