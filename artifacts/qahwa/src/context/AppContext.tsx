import { createContext, useContext, useState, ReactNode } from "react";
import { CoffeeShop, Rating, User, Avatar } from "../types";
import { SHOPS, INITIAL_RATINGS } from "../data/shops";

interface AppContextType {
  shops: CoffeeShop[];
  ratings: Rating[];
  user: User;
  avatar: Avatar | null;
  userRatedShopIds: string[];
  setAvatar: (avatar: Avatar) => void;
  submitRating: (rating: Rating) => void;
  getShopRatings: (shopId: string) => Rating[];
  getAverageRating: (shopId: string) => number | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [shops] = useState<CoffeeShop[]>(SHOPS);
  const [ratings, setRatings] = useState<Rating[]>(INITIAL_RATINGS);
  const [avatar, setAvatarState] = useState<Avatar | null>(null);
  const [userRatedShopIds, setUserRatedShopIds] = useState<string[]>([]);
  const [user, setUser] = useState<User>({
    id: "u1",
    name: "Coffee Lover",
    points: 0,
  });

  const setAvatar = (a: Avatar) => setAvatarState(a);

  const submitRating = (rating: Rating) => {
    setRatings((prev) => [...prev, rating]);
    setUserRatedShopIds((prev) =>
      prev.includes(rating.shop_id) ? prev : [...prev, rating.shop_id]
    );
    setUser((prev) => ({ ...prev, points: prev.points + 15 }));
  };

  const getShopRatings = (shopId: string) =>
    ratings.filter((r) => r.shop_id === shopId);

  const getAverageRating = (shopId: string) => {
    const shopRatings = getShopRatings(shopId);
    if (shopRatings.length === 0) return null;
    const sum = shopRatings.reduce(
      (acc, r) => acc + r.coffee + r.vibe + r.internet,
      0
    );
    return Number((sum / (shopRatings.length * 3)).toFixed(1));
  };

  return (
    <AppContext.Provider
      value={{
        shops,
        ratings,
        user,
        avatar,
        userRatedShopIds,
        setAvatar,
        submitRating,
        getShopRatings,
        getAverageRating,
      }}
    >
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
