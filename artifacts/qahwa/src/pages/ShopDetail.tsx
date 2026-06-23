import { Link, useParams } from "wouter";
import { useAppContext } from "../context/AppContext";
import { StarRating } from "../components/StarRating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowLeft, Coffee, Heart, Wifi } from "lucide-react";

export default function ShopDetail() {
  const { id } = useParams<{ id: string }>();
  const { shops, getShopRatings, getAverageRating } = useAppContext();
  
  const shop = shops.find(s => s.id === id);
  
  if (!shop) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-serif text-primary mb-4">Shop not found</h1>
        <Link href="/">
          <Button variant="outline" className="border-secondary text-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const ratings = getShopRatings(shop.id);
  const avgRating = getAverageRating(shop.id);
  
  // Calculate averages per category
  const avgCoffee = ratings.length ? ratings.reduce((acc, r) => acc + r.coffee, 0) / ratings.length : 0;
  const avgVibe = ratings.length ? ratings.reduce((acc, r) => acc + r.vibe, 0) / ratings.length : 0;
  const avgInternet = ratings.length ? ratings.reduce((acc, r) => acc + r.internet, 0) / ratings.length : 0;

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col pb-12">
      <div className="w-full h-64 md:h-80 relative">
        <img 
          src={shop.image_url} 
          alt={shop.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="absolute top-4 left-4 z-10">
          <Link href="/">
            <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/40 text-white border-none rounded-full" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 -mt-16 relative z-10 max-w-4xl">
        <div className="bg-card rounded-xl p-6 md:p-8 shadow-xl mb-8 border border-border/40">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2 leading-tight">
                {shop.name}
              </h1>
              <div className="flex items-center text-secondary">
                <MapPin className="w-5 h-5 mr-1" />
                <span className="text-lg">{shop.location}</span>
              </div>
            </div>
            <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg flex flex-col items-center justify-center min-w-24 shadow-md">
              <span className="text-sm font-medium opacity-80 uppercase tracking-wider mb-1">Overall</span>
              <span className="text-3xl font-serif font-bold">{avgRating ? avgRating.toFixed(1) : "—"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border/50">
            <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg">
              <Coffee className="w-6 h-6 text-secondary mb-2" />
              <span className="text-sm text-muted-foreground mb-1 font-medium">Coffee</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-primary">{avgCoffee ? avgCoffee.toFixed(1) : "—"}</span>
                <StarRating value={Math.round(avgCoffee)} readOnly size="sm" />
              </div>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg">
              <Heart className="w-6 h-6 text-secondary mb-2" />
              <span className="text-sm text-muted-foreground mb-1 font-medium">Vibe</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-primary">{avgVibe ? avgVibe.toFixed(1) : "—"}</span>
                <StarRating value={Math.round(avgVibe)} readOnly size="sm" />
              </div>
            </div>

            <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg">
              <Wifi className="w-6 h-6 text-secondary mb-2" />
              <span className="text-sm text-muted-foreground mb-1 font-medium">Internet</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-primary">{avgInternet ? avgInternet.toFixed(1) : "—"}</span>
                <StarRating value={Math.round(avgInternet)} readOnly size="sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-accent/10 border border-accent/20 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-serif font-bold text-primary mb-3">Been here?</h3>
          <p className="text-secondary mb-6 max-w-md">
            Share your thoughts on the brew, the atmosphere, and the connection. Help others find their next favorite spot.
          </p>
          <Link href={`/rate/${shop.id}`}>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-serif text-lg px-8 h-12 shadow-md transition-transform hover:-translate-y-0.5" data-testid={`button-rate-${shop.id}`}>
              Rate this café
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
