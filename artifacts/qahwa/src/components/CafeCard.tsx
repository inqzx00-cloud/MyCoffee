import { Link, useLocation } from "wouter";
import { CoffeeShop } from "../types";
import { useAppContext } from "../context/AppContext";
import { Star, MapPin, CheckCircle } from "lucide-react";

interface CafeCardProps {
  shop: CoffeeShop;
  accent?: string;
}

export function CafeCard({ shop, accent = "#D9A066" }: CafeCardProps) {
  const { getAverageRating, userRatedShopIds, avatar } = useAppContext();
  const [, setLocation] = useLocation();
  const avgRating = getAverageRating(shop.id);
  const isClaimed = userRatedShopIds.includes(shop.id);

  const handleRate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocation(`/rate/${shop.id}`);
  };

  return (
    <Link href={`/shop/${shop.id}`}>
      <div
        className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
        style={{
          background: "#FBF3EA",
          boxShadow: `0 2px 12px ${accent}18`,
          border: isClaimed ? `1.5px solid ${accent}` : "1.5px solid transparent",
        }}
        data-testid={`cafe-card-${shop.id}`}
      >
        {/* accent top bar */}
        <div
          className="absolute top-0 left-0 right-0 z-10 transition-all duration-300"
          style={{ height: isClaimed ? 3 : 2, background: accent }}
        />

        {/* image */}
        <div className="relative overflow-hidden" style={{ height: 180 }}>
          <img
            src={shop.image_url}
            alt={shop.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ background: "linear-gradient(to top, rgba(20,10,4,0.55) 0%, transparent 60%)", opacity: 0.6 }}
          />

          {/* Claimed badge */}
          {isClaimed && (
            <div
              className="absolute top-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold"
              style={{ background: accent, color: "#fff" }}
            >
              {avatar ? (
                <span className="text-sm leading-none">{avatar.emoji}</span>
              ) : (
                <CheckCircle size={12} />
              )}
              Claimed
            </div>
          )}

          {/* Rating pill */}
          {avgRating && (
            <div
              className="absolute top-3 right-3 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold"
              style={{ background: "rgba(251,243,234,0.92)", color: "#3E2C23", backdropFilter: "blur(4px)" }}
            >
              <Star size={11} style={{ fill: accent, color: accent }} />
              {avgRating}
            </div>
          )}

          {/* decorative checkerboard corner */}
          <div
            className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity"
            style={{
              width: 20, height: 20,
              backgroundImage: "repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%)",
              backgroundSize: "5px 5px",
              borderRadius: 3,
            }}
          />
        </div>

        {/* content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className="font-bold text-lg leading-tight flex-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
            >
              {shop.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 mb-3" style={{ color: "#A67C52" }}>
            <MapPin size={13} />
            <span className="text-sm">{shop.location}</span>
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: accent + "22", color: accent, border: `1px solid ${accent}44` }}
            >
              View café →
            </span>
            {!isClaimed && (
              <button
                onClick={handleRate}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:scale-105"
                style={{ background: "#3E2C23", color: "#F5E9DA" }}
                data-testid={`button-rate-${shop.id}`}
              >
                Rate
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
