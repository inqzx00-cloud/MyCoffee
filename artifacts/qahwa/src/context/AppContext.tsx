import { createContext, useContext, useState, ReactNode } from "react";
import { CoffeeShop, Rating, User } from "../types";
import { SHOPS, INITIAL_RATINGS } from "../data/shops";

interface AppContextType {
  shops: CoffeeShop[];
  ratings: Rating[];
  user: User;
  submitRating: (rating: Rating) => void;
  getShopRatings: (shopId: string) => Rating[];
  getAverageRating: (shopId: string) => number | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [shops] = useState<CoffeeShop[]>(SHOPS);
  const [ratings, setRatings] = useState<Rating[]>(INITIAL_RATINGS);
  const [user, setUser] = useState<User>({
    id: "u1",
    name: "Coffee Lover",
    points: 0
  });

  const submitRating = (rating: Rating) => {
    setRatings(prev => [...prev, rating]);
    // +10 base, +5 bonus since all fields are present
    setUser(prev => ({
      ...prev,
      points: prev.points + 15
    }));
  };

  const getShopRatings = (shopId: string) => {
    return ratings.filter(r => r.shop_id === shopId);
  };

  const getAverageRating = (shopId: string) => {
    const shopRatings = getShopRatings(shopId);
    if (shopRatings.length === 0) return null;
    
    const sum = shopRatings.reduce((acc, r) => acc + r.coffee + r.vibe + r.internet, 0);
    const totalCategories = shopRatings.length * 3;
    
    return Number((sum / totalCategories).toFixed(1));
  };

  return (
    <AppContext.Provider value={{ shops, ratings, user, submitRating, getShopRatings, getAverageRating }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
