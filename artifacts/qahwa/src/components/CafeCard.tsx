import { Link } from "wouter";
import { CoffeeShop } from "../types";
import { useAppContext } from "../context/AppContext";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CafeCardProps {
  shop: CoffeeShop;
}

export function CafeCard({ shop }: CafeCardProps) {
  const { getAverageRating } = useAppContext();
  const avgRating = getAverageRating(shop.id);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-none bg-card group" data-testid={`cafe-card-${shop.id}`}>
      <div className="aspect-[3/2] overflow-hidden relative">
        <img 
          src={shop.image_url} 
          alt={shop.name} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-bold text-card-foreground leading-tight">{shop.name}</h3>
          <div className="flex items-center gap-1 bg-accent/20 px-2 py-1 rounded-md text-secondary">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-medium text-sm">{avgRating ? avgRating.toFixed(1) : "—"}</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          <p className="text-sm">{shop.location}</p>
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <Link href={`/shop/${shop.id}`} className="w-full">
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-serif tracking-wide" data-testid={`button-view-${shop.id}`}>
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
