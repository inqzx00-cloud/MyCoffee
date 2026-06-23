import { Link, useParams, useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import { RatingForm } from "../components/RatingForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Rating } from "../types";

export default function RatePage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { shops, submitRating } = useAppContext();
  
  const shop = shops.find(s => s.id === id);
  
  if (!shop) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-serif text-primary mb-4">Shop not found</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const handleRatingSubmit = (ratings: { coffee: number; vibe: number; internet: number }) => {
    const newRating: Rating = {
      id: Math.random().toString(36).substring(7),
      shop_id: shop.id,
      coffee: ratings.coffee,
      vibe: ratings.vibe,
      internet: ratings.internet,
      created_at: new Date().toISOString()
    };
    
    submitRating(newRating);
    setLocation(`/shop/${shop.id}`);
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href={`/shop/${shop.id}`}>
            <Button variant="ghost" size="icon" className="text-secondary hover:text-primary mr-4" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1 truncate">
            <h1 className="font-serif font-bold text-lg text-primary truncate">
              Rating {shop.name}
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-primary mb-3">How was it?</h2>
          <p className="text-secondary">
            Your notes help the community discover the best cozy corners.
          </p>
        </div>

        <RatingForm onSubmit={handleRatingSubmit} />
      </main>
    </div>
  );
}
